import { api } from "@/lib/api";
import { queryClient } from "@/lib/query-client";
import { useLocation } from "@/store/location";
import { usePreferences } from "@/store/preferences";
import { useStoredSchedule } from "@/store/stored-schedule";
import { queryKeys } from "@jadwal-sholat/core/api";
import { getDateParts } from "@jadwal-sholat/core/dates";
import {
  buildAdzanSchedule,
  formatSholatTime,
  type AdzanChannel,
  type Coordinates,
} from "@jadwal-sholat/core/prayer";
import type { PrayerDay } from "@jadwal-sholat/core/schemas";
import Constants, { ExecutionEnvironment } from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

/** Expo Go has no bundled adzan sounds and no background tasks. */
export const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

// Android fixes a channel's sound once it exists, so a new sound needs a new
// channel id (adzan-v2), not an edit.
// iOS plays at most 30 seconds of a notification sound, so it gets the
// opening of each adzan instead (iosSound).
const CHANNELS: Record<
  AdzanChannel,
  { id: string; name: string; sound: string; iosSound: string }
> = {
  adzan: { id: "adzan-v1", name: "Adzan", sound: "adzan.mp3", iosSound: "adzan_ios.caf" },
  "adzan-subuh": {
    id: "adzan-subuh-v1",
    name: "Adzan Subuh",
    sound: "adzan_subuh.mp3",
    iosSound: "adzan_subuh_ios.caf",
  },
};

// iOS keeps only the 64 soonest pending notifications; leave room for the test.
const IOS_PENDING_LIMIT = 60;

function soundFor(channel: AdzanChannel) {
  // Expo Go doesn't ship the app's sounds; `true` is the default sound.
  if (isExpoGo) return true;
  return Platform.OS === "ios" ? CHANNELS[channel].iosSound : CHANNELS[channel].sound;
}

const ID_PREFIX = "adzan:";
const TEST_ID = "adzan-test";
// Fetch next month's times this many days before the month ends.
const NEXT_MONTH_WINDOW_DAYS = 5;

/**
 * Creates both adzan channels. Android 13+ only shows the notification
 * permission prompt once the app has a channel, so call this before asking.
 */
export async function ensureAdzanChannels() {
  await Promise.all(
    Object.values(CHANNELS).map((channel) =>
      Notifications.setNotificationChannelAsync(channel.id, {
        importance: Notifications.AndroidImportance.MAX,
        lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        name: channel.name,
        // Expo Go doesn't ship the app's raw sounds; it falls back to the default.
        sound: isExpoGo ? undefined : channel.sound,
      }),
    ),
  );
}

function monthDays(year: string, month: string, position: Coordinates) {
  return queryClient.fetchQuery({
    queryKey: queryKeys.prayerMonth(year, month, position),
    queryFn: ({ signal }) => api.prayerMonth({ month, position, year }, signal),
  });
}

/** This month (stored copy first), plus next month near the month's end. */
async function collectDays(now: Date): Promise<PrayerDay[]> {
  const { position } = useLocation.getState();
  const { schedule } = useStoredSchedule.getState();
  const today = getDateParts(now);
  const isStored =
    schedule?.month === `${today.tahun}-${today.bulan}` &&
    schedule.place === `${position.lat},${position.lng}`;

  const days = isStored
    ? schedule.days
    : await monthDays(today.tahun, today.bulan, position).catch(() => []);

  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  if (lastDay - now.getDate() > NEXT_MONTH_WINDOW_DAYS) return days;

  const next = getDateParts(new Date(now.getFullYear(), now.getMonth() + 1, 1));
  const nextDays = await monthDays(next.tahun, next.bulan, position).catch(() => []);
  return [...days, ...nextDays];
}

async function cancelAdzanNotifications() {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  await Promise.all(
    scheduled
      .filter((request) => request.identifier.startsWith(ID_PREFIX))
      .map((request) =>
        Notifications.cancelScheduledNotificationAsync(request.identifier),
      ),
  );
}

/**
 * Rebuilds the adzan alarms. Returns false when there was nothing to build
 * them from, in which case the alarms already scheduled stay.
 */
async function syncNow(): Promise<boolean> {
  const { adzanEnabled, adzanPrayers } = usePreferences.getState();
  if (
    !adzanEnabled ||
    adzanPrayers.length === 0 ||
    !(await Notifications.getPermissionsAsync()).granted
  ) {
    await cancelAdzanNotifications();
    return true;
  }

  await ensureAdzanChannels();
  const now = new Date();
  const alarms = buildAdzanSchedule({
    days: await collectDays(now),
    now,
    prayers: adzanPrayers,
    limit: Platform.OS === "ios" ? IOS_PENDING_LIMIT : undefined,
  });

  // Offline without a stored month (the 1st of a month, say), collectDays
  // finds no days. Clearing first would leave no alarm at all; the ones
  // already scheduled, which reach into this month's first days, stay until
  // a sync has a schedule to replace them with.
  if (alarms.length === 0) return false;

  await cancelAdzanNotifications();
  await Promise.all(
    alarms.map((alarm) =>
      Notifications.scheduleNotificationAsync({
        identifier: alarm.id,
        content: {
          body: `Sudah masuk waktu ${alarm.name} · ${formatSholatTime(alarm.time)}`,
          data: { prayer: alarm.key },
          // Android below 8 and iOS read the sound here; newer Android, from the channel.
          sound: soundFor(alarm.channel),
          title: `Waktu sholat ${alarm.name}`,
          // Through iOS Focus modes, with the time-sensitive entitlement.
          interruptionLevel: "timeSensitive",
        },
        trigger: {
          channelId: CHANNELS[alarm.channel].id,
          date: alarm.at,
          // ponytail: 'bestEffort' (setExactAndAllowWhileIdle) is on time with
          // the exact alarm permission; some OEMs still defer it by minutes.
          // 'alarmClock' never defers, but keeps an alarm icon in the status
          // bar until the next alarm, which with five prayers a day is always.
          // Upgrade path: an "always on time" setting that switches to it.
          delivery: "bestEffort",
          type: Notifications.SchedulableTriggerInputTypes.DATE,
        },
      }),
    ),
  );
  return true;
}

let lastSyncAt = 0;
let tail: Promise<void> = Promise.resolve();
let waiting: Promise<void> | null = null;

/** When the alarms were last rescheduled (ms since epoch), 0 if never. */
export function getLastAdzanSync() {
  return lastSyncAt;
}

/**
 * Replaces the scheduled adzan alarms with ones built from the current
 * settings, location and schedule, or keeps them when there is no schedule to
 * build from. Runs one at a time; calls that arrive while a sync waits share
 * it, since it reads state only when it starts.
 */
export function syncAdzanNotifications() {
  waiting ??= tail.then(() => {
    waiting = null;
    return syncNow().then((rescheduled) => {
      // A sync that kept the old alarms isn't done: the next foreground retries.
      if (rescheduled) lastSyncAt = Date.now();
    });
  });
  tail = waiting.catch(() => {});
  return waiting;
}

/** Dev tool: one adzan on the regular channel a minute from now. */
export async function scheduleTestAdzan() {
  await ensureAdzanChannels();
  await Notifications.scheduleNotificationAsync({
    identifier: TEST_ID,
    content: {
      body: "Ini contoh notifikasi adzan.",
      sound: soundFor("adzan"),
      title: "Tes adzan",
      interruptionLevel: "timeSensitive",
    },
    trigger: {
      channelId: CHANNELS.adzan.id,
      date: Date.now() + 60_000,
      type: Notifications.SchedulableTriggerInputTypes.DATE,
    },
  });
}

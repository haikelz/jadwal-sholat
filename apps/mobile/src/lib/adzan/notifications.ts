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

/** Expo Go has no bundled adzan sounds and no background tasks. */
export const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

// Android fixes a channel's sound once it exists, so a new sound needs a new
// channel id (adzan-v2), not an edit.
const CHANNELS: Record<
  AdzanChannel,
  { id: string; name: string; sound: string }
> = {
  adzan: { id: "adzan-v1", name: "Adzan", sound: "adzan.mp3" },
  "adzan-subuh": { id: "adzan-subuh-v1", name: "Adzan Subuh", sound: "adzan_subuh.mp3" },
};

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

async function syncNow() {
  await cancelAdzanNotifications();

  const { adzanEnabled, adzanPrayers } = usePreferences.getState();
  if (!adzanEnabled || adzanPrayers.length === 0) return;
  if (!(await Notifications.getPermissionsAsync()).granted) return;

  await ensureAdzanChannels();
  const now = new Date();
  const alarms = buildAdzanSchedule({
    days: await collectDays(now),
    now,
    prayers: adzanPrayers,
  });

  await Promise.all(
    alarms.map((alarm) =>
      Notifications.scheduleNotificationAsync({
        identifier: alarm.id,
        content: {
          body: `Sudah masuk waktu ${alarm.name} · ${formatSholatTime(alarm.time)}`,
          data: { prayer: alarm.key },
          // Android below 8 reads the sound here instead of the channel.
          sound: isExpoGo ? true : CHANNELS[alarm.channel].sound,
          title: `Waktu sholat ${alarm.name}`,
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
 * settings, location and schedule. Runs one at a time; calls that arrive
 * while a sync waits share it, since it reads state only when it starts.
 */
export function syncAdzanNotifications() {
  waiting ??= tail.then(() => {
    waiting = null;
    return syncNow().then(() => {
      lastSyncAt = Date.now();
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
      sound: isExpoGo ? true : CHANNELS.adzan.sound,
      title: "Tes adzan",
    },
    trigger: {
      channelId: CHANNELS.adzan.id,
      date: Date.now() + 60_000,
      type: Notifications.SchedulableTriggerInputTypes.DATE,
    },
  });
}

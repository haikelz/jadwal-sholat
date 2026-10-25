import { fromZoned } from "../dates/zoned-now";
import {
  PRAYERS,
  prayerTimeOn,
  type ObligatoryTimings,
  type PrayerKey,
} from "./next-prayer";

export type AdzanChannel = "adzan" | "adzan-subuh";

export type AdzanAlarm = {
  /** Stable id, so rescheduling replaces instead of duplicating. */
  id: string;
  key: PrayerKey;
  name: string;
  /** The API time, e.g. "04:21 (WIB)". */
  time: string;
  at: Date;
  channel: AdzanChannel;
};

export type AdzanScheduleDay = {
  date: { gregorian: { date: string } };
  /** The location's timezone, e.g. "Asia/Makassar". */
  meta?: { timezone: string };
  timings: ObligatoryTimings;
};

// Android caps scheduled alarms per app at 500; stay far below it.
export const MAX_ADZAN_ALARMS = 150;

/** "dd-MM-yyyy" (aladhan's gregorian.date) → local midnight. */
function parseDayDate(value: string) {
  const [day, month, year] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toIsoDay(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/**
 * Future adzan alarms for the given days (pass this month, plus next month's
 * days near month end), sorted by time and capped.
 */
export function buildAdzanSchedule({
  days,
  limit = MAX_ADZAN_ALARMS,
  now,
  prayers = PRAYERS.map((prayer) => prayer.key),
}: {
  days: readonly AdzanScheduleDay[];
  limit?: number;
  now: Date;
  prayers?: readonly PrayerKey[];
}): AdzanAlarm[] {
  const enabled = new Set(prayers);
  const alarms: AdzanAlarm[] = [];

  for (const day of days) {
    const date = parseDayDate(day.date.gregorian.date);
    for (const prayer of PRAYERS) {
      if (!enabled.has(prayer.key)) continue;

      // The API's times are the location's wall clock; an alarm needs the
      // instant, which differs when the device is in another timezone.
      const wallClock = prayerTimeOn(day.timings[prayer.key], date);
      const at = day.meta?.timezone ? fromZoned(wallClock, day.meta.timezone) : wallClock;
      if (at <= now) continue;

      alarms.push({
        at,
        channel: prayer.key === "Fajr" ? "adzan-subuh" : "adzan",
        id: `adzan:${toIsoDay(date)}:${prayer.key}`,
        key: prayer.key,
        name: prayer.name,
        time: day.timings[prayer.key],
      });
    }
  }

  return alarms
    .sort((a, b) => a.at.getTime() - b.at.getTime())
    .slice(0, limit);
}

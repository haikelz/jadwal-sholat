import type { PrayerDay } from "../schemas/prayer";

/**
 * Tomorrow's timings. On the last day of a month tomorrow lives in the next
 * month's data, which the caller passes when it has it.
 */
export function getTomorrowTimings(
  month: readonly PrayerDay[],
  todayIndex: number,
  nextMonth?: readonly PrayerDay[],
): PrayerDay["timings"] | undefined {
  if (todayIndex < 0) return undefined;
  return month[todayIndex + 1]?.timings ?? nextMonth?.[0]?.timings;
}

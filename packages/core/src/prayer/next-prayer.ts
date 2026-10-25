import type { PrayerTimings } from "../schemas/prayer";

export const PRAYERS = [
  { key: "Fajr", name: "Subuh" },
  { key: "Dhuhr", name: "Dzuhur" },
  { key: "Asr", name: "Ashar" },
  { key: "Maghrib", name: "Maghrib" },
  { key: "Isha", name: "Isya" },
] as const;

export type PrayerKey = (typeof PRAYERS)[number]["key"];

/** The five obligatory prayer times; any wider timings object also fits. */
export type ObligatoryTimings = Pick<PrayerTimings, PrayerKey>;

// Reads "HH:mm (TZ)" as a wall-clock time on `day`. For a location in another
// timezone, callers pass zonedNow(now, meta.timezone) as `now`, so the
// comparison and the countdown use the location's clock.
export function prayerTimeOn(time: string, day: Date) {
  const [hours, minutes] = time.slice(0, 5).split(":").map(Number);
  const result = new Date(day);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

/**
 * The obligatory prayer whose time has most recently started today, or null
 * before Subuh.
 */
export function getCurrentPrayer(
  today: ObligatoryTimings,
  now: Date,
): { key: PrayerKey; name: string } | null {
  let current: { key: PrayerKey; name: string } | null = null;
  for (const prayer of PRAYERS) {
    if (prayerTimeOn(today[prayer.key], now) <= now) current = prayer;
  }
  return current;
}

/** The next obligatory prayer after `now`, falling back to tomorrow's Subuh. */
export function getNextPrayer(
  today: ObligatoryTimings,
  tomorrow: ObligatoryTimings | undefined,
  now: Date,
): {
  key: PrayerKey;
  name: string;
  time: string;
  at: Date;
  isTomorrow: boolean;
} | null {
  for (const prayer of PRAYERS) {
    const at = prayerTimeOn(today[prayer.key], now);
    if (at > now)
      return { ...prayer, time: today[prayer.key], at, isTomorrow: false };
  }
  if (!tomorrow) return null;

  const nextDay = new Date(now);
  nextDay.setDate(nextDay.getDate() + 1);
  return {
    ...PRAYERS[0],
    time: tomorrow.Fajr,
    at: prayerTimeOn(tomorrow.Fajr, nextDay),
    isTomorrow: true,
  };
}

/** "2 jam 14 menit lagi", "14 menit lagi", or "kurang dari 1 menit lagi". */
export function formatCountdown(from: Date, to: Date) {
  const totalMinutes = Math.floor((to.getTime() - from.getTime()) / 60000);
  if (totalMinutes < 1) return "kurang dari 1 menit lagi";

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes} menit lagi`;
  return minutes === 0
    ? `${hours} jam lagi`
    : `${hours} jam ${minutes} menit lagi`;
}

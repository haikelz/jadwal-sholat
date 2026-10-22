import type { PrayerTimings } from "../schemas/prayer";

/** The eight times shown for a day, in order, with Indonesian names. */
export const DAY_TIMES = [
  { key: "Imsak", name: "Imsak" },
  { key: "Fajr", name: "Subuh" },
  { key: "Sunrise", name: "Terbit" },
  { key: "Dhuhr", name: "Dzuhur" },
  { key: "Asr", name: "Ashar" },
  { key: "Sunset", name: "Terbenam" },
  { key: "Maghrib", name: "Maghrib" },
  { key: "Isha", name: "Isya" },
] as const satisfies ReadonlyArray<{ key: keyof PrayerTimings; name: string }>;

export type DayTimeKey = (typeof DAY_TIMES)[number]["key"];

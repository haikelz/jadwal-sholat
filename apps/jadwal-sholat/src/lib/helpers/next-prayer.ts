import { TimingsProps } from "@/interfaces";

export const PRAYERS = [
  { key: "Fajr", name: "Subuh" },
  { key: "Dhuhr", name: "Dzuhur" },
  { key: "Asr", name: "Ashar" },
  { key: "Maghrib", name: "Maghrib" },
  { key: "Isha", name: "Isya" },
] as const;

export type PrayerKey = (typeof PRAYERS)[number]["key"];

// ponytail: reads "HH:mm (TZ)" against the device clock, so a device in a
// different timezone than the chosen location gets a shifted countdown.
// Upgrade path: use the API's meta.timezone with Intl to build the instant.
function toDate(time: string, day: Date) {
  const [hours, minutes] = time.slice(0, 5).split(":").map(Number);
  const result = new Date(day);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

/** The next obligatory prayer after `now`, falling back to tomorrow's Subuh. */
export function getNextPrayer(
  today: TimingsProps,
  tomorrow: TimingsProps | undefined,
  now: Date,
): {
  key: PrayerKey;
  name: string;
  time: string;
  at: Date;
  isTomorrow: boolean;
} | null {
  for (const prayer of PRAYERS) {
    const at = toDate(today[prayer.key], now);
    if (at > now)
      return { ...prayer, time: today[prayer.key], at, isTomorrow: false };
  }
  if (!tomorrow) return null;
  const nextDay = new Date(now);
  nextDay.setDate(nextDay.getDate() + 1);
  return {
    ...PRAYERS[0],
    time: tomorrow.Fajr,
    at: toDate(tomorrow.Fajr, nextDay),
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

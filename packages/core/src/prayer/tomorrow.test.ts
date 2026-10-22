import { describe, expect, test } from "bun:test";
import type { PrayerDay } from "../schemas/prayer";
import { getTomorrowTimings } from "./tomorrow";

function day(date: string, fajr: string): PrayerDay {
  const time = "12:00 (WIB)";
  return {
    date: {
      gregorian: { date },
      hijri: { day: "1", month: { ar: "", en: "", number: 1 }, year: "1448" },
      readable: date,
    },
    timings: {
      Asr: time,
      Dhuhr: time,
      Fajr: fajr,
      Imsak: time,
      Isha: time,
      Maghrib: time,
      Sunrise: time,
      Sunset: time,
    },
  };
}

const october = [day("30-10-2026", "04:10 (WIB)"), day("31-10-2026", "04:09 (WIB)")];
const november = [day("01-11-2026", "04:08 (WIB)")];

describe("getTomorrowTimings", () => {
  test("uses the next day of the same month", () => {
    expect(getTomorrowTimings(october, 0, november)?.Fajr).toBe("04:09 (WIB)");
  });

  test("uses next month's first day on the last day of a month", () => {
    expect(getTomorrowTimings(october, 1, november)?.Fajr).toBe("04:08 (WIB)");
  });

  test("is undefined without next month's data or a today", () => {
    expect(getTomorrowTimings(october, 1)).toBeUndefined();
    expect(getTomorrowTimings(october, -1, november)).toBeUndefined();
  });
});

import { describe, expect, test } from "bun:test";
import { buildAdzanSchedule } from "./adzan-schedule";

const timings = {
  Asr: "15:02 (WIB)",
  Dhuhr: "11:42 (WIB)",
  Fajr: "04:21 (WIB)",
  Isha: "19:01 (WIB)",
  Maghrib: "17:50 (WIB)",
};

const days = ["30-10-2026", "31-10-2026", "01-11-2026"].map((date) => ({
  date: { gregorian: { date } },
  timings,
}));

describe("buildAdzanSchedule", () => {
  test("keeps only future prayers, across a month boundary, in order", () => {
    const alarms = buildAdzanSchedule({
      days,
      now: new Date(2026, 9, 31, 16, 0),
    });

    expect(alarms.map((alarm) => alarm.id)).toEqual([
      "adzan:2026-10-31:Maghrib",
      "adzan:2026-10-31:Isha",
      "adzan:2026-11-01:Fajr",
      "adzan:2026-11-01:Dhuhr",
      "adzan:2026-11-01:Asr",
      "adzan:2026-11-01:Maghrib",
      "adzan:2026-11-01:Isha",
    ]);
  });

  test("routes Subuh to its own channel", () => {
    const [first] = buildAdzanSchedule({
      days,
      now: new Date(2026, 9, 31, 23, 0),
    });

    expect(first?.key).toBe("Fajr");
    expect(first?.channel).toBe("adzan-subuh");
  });

  test("respects disabled prayers and the cap", () => {
    const alarms = buildAdzanSchedule({
      days,
      limit: 2,
      now: new Date(2026, 9, 30, 0, 0),
      prayers: ["Fajr", "Maghrib"],
    });

    expect(alarms.map((alarm) => alarm.key)).toEqual(["Fajr", "Maghrib"]);
  });
});

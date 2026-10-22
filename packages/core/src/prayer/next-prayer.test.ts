import { describe, expect, test } from "bun:test";
import { formatCountdown, getCurrentPrayer, getNextPrayer } from "./next-prayer";

const day = {
  Asr: "15:02 (WIB)",
  Dhuhr: "11:42 (WIB)",
  Fajr: "04:21 (WIB)",
  Isha: "19:01 (WIB)",
  Maghrib: "17:50 (WIB)",
};

const at = (hours: number, minutes: number) =>
  new Date(2026, 9, 19, hours, minutes);

describe("getNextPrayer", () => {
  test("picks the next prayer later today", () => {
    expect(getNextPrayer(day, day, at(12, 48))?.name).toBe("Ashar");
    expect(getNextPrayer(day, day, at(15, 2))?.name).toBe("Maghrib");
    expect(getNextPrayer(day, day, at(3, 0))?.name).toBe("Subuh");
  });

  test("falls back to tomorrow's Subuh after Isya", () => {
    const late = getNextPrayer(day, day, at(20, 0));

    expect(late?.isTomorrow).toBe(true);
    expect(late?.at.getDate()).toBe(20);
  });

  test("returns null after Isya when tomorrow is unknown", () => {
    expect(getNextPrayer(day, undefined, at(20, 0))).toBeNull();
  });
});

describe("formatCountdown", () => {
  test("formats hours and minutes in Indonesian", () => {
    expect(formatCountdown(at(12, 48), at(15, 2))).toBe("2 jam 14 menit lagi");
    expect(formatCountdown(at(14, 48), at(15, 2))).toBe("14 menit lagi");
    expect(formatCountdown(at(13, 2), at(15, 2))).toBe("2 jam lagi");
    expect(formatCountdown(at(15, 2), at(15, 2))).toBe("kurang dari 1 menit lagi");
  });
});

describe("getCurrentPrayer", () => {
  test("is the latest prayer that has started", () => {
    expect(getCurrentPrayer(day, at(3, 0))).toBeNull();
    expect(getCurrentPrayer(day, at(4, 21))?.name).toBe("Subuh");
    expect(getCurrentPrayer(day, at(12, 48))?.name).toBe("Dzuhur");
    expect(getCurrentPrayer(day, at(23, 30))?.name).toBe("Isya");
  });
});

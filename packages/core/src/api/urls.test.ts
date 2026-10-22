import { describe, expect, test } from "bun:test";
import {
  hadithRangeUrl,
  nextHadithPage,
  nominatimSearchUrl,
  prayerMonthUrl,
  puasaScheduleUrl,
  surahUrl,
} from "./urls";

describe("URL builders", () => {
  test("prayer month uses Kemenag (method 20)", () => {
    expect(
      prayerMonthUrl("https://api.aladhan.com/v1/calendar", {
        month: "10",
        position: { lat: -6.91, lng: 107.61 },
        year: "2026",
      }),
    ).toBe(
      "https://api.aladhan.com/v1/calendar/2026/10?latitude=-6.91&longitude=107.61&method=20",
    );
  });

  test("surah carries the reciter", () => {
    expect(surahUrl("https://q", 2, 7)).toBe("https://q/quran/2?imamId=7");
  });

  test("hadith pages are 25 long and 1-based", () => {
    expect(hadithRangeUrl("https://h", "bukhari", 1)).toBe(
      "https://h/books/bukhari?range=1-25",
    );
    expect(hadithRangeUrl("https://h", "bukhari", 3)).toBe(
      "https://h/books/bukhari?range=51-75",
    );
  });

  test("puasa calls the upstream schedule endpoint", () => {
    expect(puasaScheduleUrl("https://p", "2026-10")).toBe(
      "https://p/api/id/fasting/schedules?period=month&date=2026-10-01",
    );
  });

  test("place search encodes the query", () => {
    expect(nominatimSearchUrl("https://n", "kota bandung")).toContain(
      "&q=kota%20bandung",
    );
  });
});

describe("nextHadithPage", () => {
  test("stops once every hadith is loaded", () => {
    expect(nextHadithPage(60, 1)).toBe(2);
    expect(nextHadithPage(60, 3)).toBeUndefined();
    expect(nextHadithPage(50, 2)).toBeUndefined();
  });
});

import { expect, test } from "bun:test";
import type { PuasaDate } from "../schemas/puasa-sunnah";
import { getPuasaShortName } from "./short-name";

function puasaDate(weekday: string, hijriDay: number): PuasaDate {
  return {
    date: "2026-10-26",
    hijri: {
      day: hijriDay,
      month: 1,
      year: 1448,
    },
    recommendations: [],
    weekday,
  };
}

test("Monday and Thursday name the weekday the API returns", () => {
  const recommendation = {
    key: "monday_thursday",
    name: "Senin atau Kamis",
  };

  expect(getPuasaShortName(puasaDate("Senin", 1), recommendation)).toBe(
    "Senin",
  );
  expect(getPuasaShortName(puasaDate("Kamis", 1), recommendation)).toBe(
    "Kamis",
  );
});

test("9 Muharram is Tasu'a and 10 Muharram is Asyura", () => {
  const recommendation = {
    key: "ashura",
    name: "Hari pendamping Asyura",
  };

  expect(getPuasaShortName(puasaDate("Rabu", 9), recommendation)).toBe(
    "Tasu'a",
  );
  expect(getPuasaShortName(puasaDate("Kamis", 10), recommendation)).toBe(
    "Asyura",
  );
});

test("known types get a label of at most 12 characters", () => {
  const keys = [
    "arafah",
    "first_nine_dhul_hijjah",
    "six_shawwal_candidate",
    "white_days",
  ];

  for (const key of keys) {
    const label = getPuasaShortName(puasaDate("Senin", 13), {
      key,
      name: "Nama lengkap yang panjang sekali",
    });

    expect(label.length).toBeLessThanOrEqual(12);
  }
});

test("an unknown type falls back to the API's full name", () => {
  const recommendation = {
    key: "new_type",
    name: "Puasa jenis baru",
  };

  expect(getPuasaShortName(puasaDate("Selasa", 5), recommendation)).toBe(
    "Puasa jenis baru",
  );
});

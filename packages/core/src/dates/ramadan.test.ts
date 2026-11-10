import { describe, expect, test } from "bun:test";
import { kemenagRamadan, ramadanHijriYear, shiftIsoDate, umalquraRamadan } from "./ramadan";

describe("ramadanHijriYear", () => {
  test("before Ramadan, the coming one", () => {
    expect(ramadanHijriYear(new Date("2026-11-07T12:00:00Z"))).toBe(1448); // Jumada al-Ula 1448
  });
  test("during Ramadan, the current one", () => {
    expect(ramadanHijriYear(new Date("2027-02-20T12:00:00Z"))).toBe(1448);
  });
  test("after Ramadan, next year's", () => {
    expect(ramadanHijriYear(new Date("2027-03-25T12:00:00Z"))).toBe(1449); // Shawwal 1448
  });
});

describe("umalquraRamadan", () => {
  test("finds the coming month", () => {
    expect(umalquraRamadan(new Date("2026-11-07T12:00:00Z"))).toEqual({ start: "2027-02-08", end: "2027-03-08" });
  });
  test("finds the current month from its start", () => {
    expect(umalquraRamadan(new Date("2027-02-25T12:00:00Z")).start).toBe("2027-02-08");
  });
});

describe("kemenagRamadan", () => {
  // Kemenag's calendar for 1448: 1 Ramadan on 8 February, 30 days, Idulfitri 10 March.
  test("30 days when the 30th day is still Ramadan", () => {
    expect(kemenagRamadan("2027-02-22", 15, 9)).toEqual({ start: "2027-02-08", end: "2027-03-09" });
  });
  test("29 days when the 30th day is Syawal", () => {
    expect(kemenagRamadan("2027-02-22", 15, 10)).toEqual({ start: "2027-02-08", end: "2027-03-08" });
  });
});

test("shiftIsoDate crosses months", () => {
  expect(shiftIsoDate("2027-02-28", 1)).toBe("2027-03-01");
});

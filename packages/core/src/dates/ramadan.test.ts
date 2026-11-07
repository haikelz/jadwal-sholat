import { describe, expect, test } from "bun:test";
import { ramadanHijriYear } from "./ramadan";

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

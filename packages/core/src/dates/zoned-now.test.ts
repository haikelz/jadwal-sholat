import { describe, expect, test } from "bun:test";
import { zonedNow } from "./zoned-now";

describe("zonedNow", () => {
  // 23:30 WIB on 24 October is already 01:30 WIT on 25 October.
  const instant = new Date("2026-10-24T16:30:00Z");

  test("reads the wall clock of each Indonesian zone", () => {
    const wib = zonedNow(instant, "Asia/Jakarta");
    const wit = zonedNow(instant, "Asia/Jayapura");
    expect([wib.getDate(), wib.getHours(), wib.getMinutes()]).toEqual([24, 23, 30]);
    expect([wit.getDate(), wit.getHours(), wit.getMinutes()]).toEqual([25, 1, 30]);
  });

  test("keeps differences between two readings", () => {
    const later = new Date(instant.getTime() + 90 * 60 * 1000);
    const diff = zonedNow(later, "Asia/Makassar").getTime() - zonedNow(instant, "Asia/Makassar").getTime();
    expect(diff).toBe(90 * 60 * 1000);
  });
});

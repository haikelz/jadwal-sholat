import { describe, expect, test } from "bun:test";
import { fromZoned, zonedNow } from "./zoned-now";

// 23:30 WIB on 24 October is already 01:30 WIT on 25 October.
const instant = new Date("2026-10-24T16:30:00Z");

describe("zonedNow", () => {

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

  test("keeps the device clock for an unknown zone", () => {
    expect(zonedNow(instant, "Not/AZone")).toBe(instant);
  });
});

describe("fromZoned", () => {
  test("turns a zone's wall clock into the real instant", () => {
    // 04:00 WIT on 25 October is 19:00 UTC on 24 October, on any device.
    const wallClock = new Date(2026, 9, 25, 4, 0);
    expect(fromZoned(wallClock, "Asia/Jayapura").toISOString()).toBe("2026-10-24T19:00:00.000Z");
  });

  test("undoes zonedNow", () => {
    expect(fromZoned(zonedNow(instant, "Asia/Makassar"), "Asia/Makassar").getTime()).toBe(instant.getTime());
  });
});

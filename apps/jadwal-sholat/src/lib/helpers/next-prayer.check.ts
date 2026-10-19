// Run: bun src/lib/helpers/next-prayer.check.ts
import assert from "node:assert/strict";
import { formatCountdown, getNextPrayer } from "./next-prayer";

const day = {
  Imsak: "04:11 (WIB)",
  Fajr: "04:21 (WIB)",
  Sunrise: "05:36 (WIB)",
  Dhuhr: "11:42 (WIB)",
  Asr: "15:02 (WIB)",
  Sunset: "17:50 (WIB)",
  Maghrib: "17:50 (WIB)",
  Isha: "19:01 (WIB)",
} as never;

const at = (h: number, m: number) => new Date(2026, 9, 19, h, m);

assert.equal(getNextPrayer(day, day, at(12, 48))?.name, "Ashar");
assert.equal(getNextPrayer(day, day, at(15, 2))?.name, "Maghrib");
assert.equal(getNextPrayer(day, day, at(3, 0))?.name, "Subuh");
const late = getNextPrayer(day, day, at(20, 0));
assert.equal(late?.isTomorrow, true);
assert.equal(late?.at.getDate(), 20);
assert.equal(getNextPrayer(day, undefined, at(20, 0)), null);

assert.equal(formatCountdown(at(12, 48), at(15, 2)), "2 jam 14 menit lagi");
assert.equal(formatCountdown(at(14, 48), at(15, 2)), "14 menit lagi");
assert.equal(formatCountdown(at(13, 2), at(15, 2)), "2 jam lagi");
assert.equal(formatCountdown(at(15, 2), at(15, 2)), "kurang dari 1 menit lagi");

console.log("next-prayer: ok");

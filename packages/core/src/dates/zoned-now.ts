/**
 * `now` as a Date whose local fields read the wall clock in `timeZone`, so the
 * device-clock helpers (getDateParts, getNextPrayer, formatCountdown) work for
 * a location in another timezone. Read its fields and differences only: the
 * instant itself is shifted by the gap between the two zones. An unknown zone
 * keeps the device clock.
 */
export function zonedNow(now: Date, timeZone: string) {
  let formatter: Intl.DateTimeFormat;
  try {
    formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return now;
  }
  const parts = Object.fromEntries(
    formatter.formatToParts(now).map((part) => [part.type, Number(part.value)]),
  );
  return new Date(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
    now.getMilliseconds(),
  );
}

/**
 * The real instant of `wallClock` (its local fields) read in `timeZone`, the
 * inverse of zonedNow: "04:21" in Asia/Jayapura becomes the moment an alarm
 * must ring, whatever the device's timezone.
 */
export function fromZoned(wallClock: Date, timeZone: string) {
  const offset = zonedNow(wallClock, timeZone).getTime() - wallClock.getTime();
  return new Date(wallClock.getTime() - offset);
}

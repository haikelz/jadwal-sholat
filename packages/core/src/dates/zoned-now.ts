/**
 * `now` as a Date whose local fields read the wall clock in `timeZone`, so the
 * device-clock helpers (getDateParts, getNextPrayer, formatCountdown) work for
 * a city in another timezone. Read its fields and differences only: the
 * instant itself is shifted by the gap between the two zones.
 */
export function zonedNow(now: Date, timeZone: string) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(now)
      .map((part) => [part.type, Number(part.value)]),
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

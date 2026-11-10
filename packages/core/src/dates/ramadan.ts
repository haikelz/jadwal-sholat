import { format } from "date-fns";

const RAMADAN = 9;

/** A date on the Umm al-Qura Hijri calendar, read in `timeZone` (default: local). */
function ummAlQura(date: Date, timeZone?: string) {
  const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
    day: "numeric",
    month: "numeric",
    timeZone,
    year: "numeric",
  }).formatToParts(date);
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value.replace(/\D/g, ""));
  return { day: value("day"), month: value("month"), year: value("year") };
}

/**
 * Hijri year of this Ramadan, or of the next one once this year's has ended,
 * on the Umm al-Qura calendar.
 */
export function ramadanHijriYear(date: Date): number {
  const { month, year } = ummAlQura(date);
  return month > RAMADAN ? year + 1 : year;
}

/** A "yyyy-MM-dd" date moved by `days`. */
export function shiftIsoDate(iso: string, days: number): string {
  const date = new Date(`${iso}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/**
 * First and last day ("yyyy-MM-dd") of the Ramadan ramadanHijriYear picks, on
 * the Umm al-Qura calendar: the fallback, and the estimate for looking up
 * Kemenag's dates, which differ by a day at most.
 */
export function umalquraRamadan(now: Date): { start: string; end: string } {
  const year = ramadanHijriYear(now);
  // From a month back, so a Ramadan already under way is found from its start.
  const from = shiftIsoDate(format(now, "yyyy-MM-dd"), -31);
  let start: string | undefined;
  let end: string | undefined;
  for (let offset = 0; offset < 420; offset++) {
    const iso = shiftIsoDate(from, offset);
    const hijri = ummAlQura(new Date(`${iso}T12:00:00Z`), "UTC");
    if (hijri.year === year && hijri.month === RAMADAN) {
      start ??= iso;
      end = iso;
    } else if (start) break;
  }
  if (!start || !end) throw new Error(`Ramadan ${year} not found`);
  return { start, end };
}

/**
 * Kemenag's Ramadan from two lookups on its calendar: a date inside Ramadan
 * with its Hijri day, and the Hijri month of the 30th day after the start (9
 * when Ramadan has 30 days, 10 when it has 29).
 */
export function kemenagRamadan(insideIso: string, insideDay: number, day30Month: number) {
  const start = shiftIsoDate(insideIso, 1 - insideDay);
  return { start, end: shiftIsoDate(start, day30Month === RAMADAN ? 29 : 28) };
}

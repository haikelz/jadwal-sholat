import type { Coordinates } from "../prayer/location";

export type ApiBaseUrls = {
  asmaulHusna: string;
  hadith: string;
  nominatim: string;
  prayer: string;
  /** The upstream puasa sunnah API, not the web's /api/puasa-sunnah rewrite. */
  puasaSunnah: string;
  quran: string;
};

export const HADITH_PAGE_SIZE = 25;

/** aladhan calendar for a month; method 20 is Kemenag RI. */
export function prayerMonthUrl(
  base: string,
  { month, position, year }: { month: string; position: Coordinates; year: string },
) {
  return `${base}/${year}/${month}?latitude=${position.lat}&longitude=${position.lng}&method=20`;
}

export function surahListUrl(base: string) {
  return `${base}/quran`;
}

export function surahUrl(base: string, surahNumber: number, qori: number) {
  return `${base}/quran/${surahNumber}?imamId=${qori}`;
}

export function hadithBooksUrl(base: string) {
  return `${base}/books`;
}

/** One page of a book; pages are 1-based and HADITH_PAGE_SIZE long. */
export function hadithRangeUrl(base: string, bookId: string, page: number) {
  const from = (page - 1) * HADITH_PAGE_SIZE + 1;
  const to = page * HADITH_PAGE_SIZE;
  return `${base}/books/${bookId}?range=${from}-${to}`;
}

export function hadithDetailUrl(base: string, bookId: string, hadithNumber: number) {
  return `${base}/books/${bookId}/${hadithNumber}`;
}

/** The next page to load, or undefined once every hadith of the book is in. */
export function nextHadithPage(available: number, loadedPages: number) {
  const totalPages = Math.ceil(available / HADITH_PAGE_SIZE);
  return loadedPages < totalPages ? loadedPages + 1 : undefined;
}

export function asmaulHusnaUrl(base: string) {
  return `${base}/api/all`;
}

/** `month` is "yyyy-MM"; the API takes the first day of that month. */
export function puasaScheduleUrl(base: string, month: string) {
  return `${base}/api/id/fasting/schedules?period=month&date=${month}-01`;
}

export function nominatimReverseUrl(base: string, position: Coordinates) {
  return `${base}/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}&accept-language=id`;
}

/**
 * City search, limited to Indonesia. Nominatim's policy forbids
 * autocomplete: call this on submit, never per keystroke.
 */
export function nominatimSearchUrl(base: string, query: string) {
  return `${base}/search?format=jsonv2&addressdetails=1&countrycodes=id&accept-language=id&limit=10&q=${encodeURIComponent(query)}`;
}

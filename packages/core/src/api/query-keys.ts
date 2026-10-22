import type { Coordinates } from "../prayer/location";

/** Stable query keys, so caches and persistence allowlists agree. */
export const queryKeys = {
  asmaulHusna: () => ["asmaul-husna"] as const,
  hadithBooks: () => ["hadith-books"] as const,
  hadithDetail: (bookId: string, hadithNumber: number) =>
    ["hadith", bookId, hadithNumber] as const,
  hadithPages: (bookId: string) => ["hadith-pages", bookId] as const,
  placeLabel: (position: Coordinates) =>
    ["place-label", position.lat, position.lng] as const,
  prayerMonth: (year: string, month: string, position: Coordinates) =>
    ["prayer-month", year, month, position.lat, position.lng] as const,
  puasaSchedule: (month: string) => ["puasa-schedule", month] as const,
  surah: (surahNumber: number, qori: number) =>
    ["surah", surahNumber, qori] as const,
  surahList: () => ["surah-list"] as const,
};

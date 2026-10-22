import type { SurahListItem } from "../schemas/quran";

export const SURAH_TYPE_OPTIONS = [
  { value: "all", label: "Semua" },
  { value: "Makkiyyah", label: "Makkiyyah" },
  { value: "Madaniyyah", label: "Madaniyyah" },
] as const;

export type SurahTypeFilter = (typeof SURAH_TYPE_OPTIONS)[number]["value"];

/** Search by Latin name, filter by revelation place, sort by surah number. */
export function filterSurahs(
  surahs: readonly SurahListItem[],
  {
    ascending = true,
    search = "",
    type = "all",
  }: {
    ascending?: boolean;
    search?: string;
    type?: SurahTypeFilter;
  },
): SurahListItem[] {
  const query = search.trim().toLowerCase();

  return surahs
    .filter((surah) => type === "all" || surah.type.id === type)
    .filter(
      (surah) => !query || surah.asma.id.short.toLowerCase().includes(query),
    )
    .sort((a, b) => (ascending ? a.number - b.number : b.number - a.number));
}

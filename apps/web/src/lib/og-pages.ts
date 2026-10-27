import { CITIES, SURAH_LIST, ZONE_LABELS } from "@jadwal-sholat/core/data";
import { NAMED_PASSAGES, passageRange } from "@jadwal-sholat/core/quran";

export type OgPage = { title: string; description: string };

/**
 * Every page with its own social image, keyed by path without the leading
 * slash ("home" is the homepage). src/pages/og/[...route].ts renders each one
 * to /og/<key>.png at build time.
 */
export const OG_PAGES: Record<string, OgPage> = {
  home: { title: "Jadwal Sholat Hari Ini", description: "Sesuai lokasi kamu, metode Kemenag RI" },
  quran: { title: "Al-Qur'an Online", description: "114 surat dengan terjemahan, tafsir dan audio" },
  ayat: { title: "Ayat Pilihan", description: "Ayat dan doa dari Al-Qur'an yang sering dicari" },
  hadith: { title: "Kumpulan Hadith", description: "Bukhari, Muslim dan kitab lainnya" },
  "asmaul-husna": { title: "Asmaul Husna", description: "99 nama Allah, Arab, latin dan artinya" },
  "sunnah-fasting": { title: "Jadwal Puasa Sunnah", description: "Senin Kamis, Ayyamul Bidh, Arafah dan lainnya" },
  "jadwal-sholat": { title: "Jadwal Sholat per Kota", description: `${CITIES.length} kota di Indonesia, WIB, WITA dan WIT` },
  ...Object.fromEntries(
    SURAH_LIST.map((surah) => [
      `quran/${surah.number}`,
      {
        title: `Surat ${surah.asma.id.short}`,
        description: `${surah.asma.translation.id} · ${surah.ayahCount} ayat · ${surah.type.id}`,
      },
    ]),
  ),
  ...Object.fromEntries(
    CITIES.map((city) => [
      `jadwal-sholat/${city.slug}`,
      { title: `Jadwal Sholat ${city.name}`, description: `${city.province} · ${ZONE_LABELS[city.timeZone]}` },
    ]),
  ),
  ...Object.fromEntries(
    NAMED_PASSAGES.map((passage) => [
      `ayat/${passage.slug}`,
      {
        title: passage.name,
        description: `QS. ${SURAH_LIST[passage.surah - 1]?.asma.id.short}: ${passageRange(passage)}`,
      },
    ]),
  ),
};

/**
 * The page's own social image and its alt text, or undefined for the shared
 * one. Every hadith URL serves the /hadith-detail shell, so all of them use
 * the hadith image.
 */
export function ogImageFor(path: string) {
  const key = path === "/" ? "home" : path.startsWith("/hadith") ? "hadith" : path.slice(1);
  const page = OG_PAGES[key];
  return page ? { src: `/og/${key}.png`, alt: `${page.title} · ${page.description}` } : undefined;
}

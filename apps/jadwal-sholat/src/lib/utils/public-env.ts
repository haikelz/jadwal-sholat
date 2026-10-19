// Plain NEXT_PUBLIC_* reads that Next inlines at build time. Validation lives
// in src/env.mjs, which next.config imports, so zod stays out of the browser.
export const env = {
  NEXT_PUBLIC_QURAN_API: process.env.NEXT_PUBLIC_QURAN_API!,
  NEXT_PUBLIC_PUASA_SUNNAH_API: process.env.NEXT_PUBLIC_PUASA_SUNNAH_API!,
  NEXT_PUBLIC_JADWAL_SHOLAT_API: process.env.NEXT_PUBLIC_JADWAL_SHOLAT_API!,
  NEXT_PUBLIC_ASMAUL_HUSNA_API: process.env.NEXT_PUBLIC_ASMAUL_HUSNA_API!,
  NEXT_PUBLIC_NOMINATIM_API: process.env.NEXT_PUBLIC_NOMINATIM_API!,
  NEXT_PUBLIC_HADITH_API: process.env.NEXT_PUBLIC_HADITH_API!,
};

// The public API endpoints, fixed in code like the Android app's
// src/lib/api.ts: there is no staging API to switch to. The puasa API sends
// no CORS header, so the browser reaches it through the Pages Function at
// /api/sunnah-fasting (functions/api/sunnah-fasting.ts) instead.
export const env = {
  ASMAUL_HUSNA_API: "https://asmaul-husna-api.vercel.app",
  HADITH_API: "https://hadith.ekel.dev",
  JADWAL_SHOLAT_API: "https://api.aladhan.com/v1/calendar",
  NOMINATIM_API: "https://nominatim.openstreetmap.org",
  QURAN_API: "https://quran.ekel.dev",
};

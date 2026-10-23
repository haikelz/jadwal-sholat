// Public API base URLs from .env (or the Pages build variables) through
// astro:env; the schema in astro.config.mjs stops the build when one is missing
// or isn't a URL. The puasa API sends no CORS header, so the browser reaches it
// through the same-origin /api/sunnah-fasting proxy instead.
import {
  ASMAUL_HUSNA_API,
  HADITH_API,
  JADWAL_SHOLAT_API,
  NOMINATIM_API,
  QURAN_API,
} from "astro:env/client";

export const env = { ASMAUL_HUSNA_API, HADITH_API, JADWAL_SHOLAT_API, NOMINATIM_API, QURAN_API };

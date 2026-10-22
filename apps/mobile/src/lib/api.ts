import { createApiClient } from "@jadwal-sholat/core/api";
import Constants from "expo-constants";

// Public API base URLs from apps/mobile/.env locally and from the EAS
// environment on EAS (see .env.example). Expo inlines EXPO_PUBLIC_* values at
// bundle time, so each one must be read as a plain process.env.NAME expression.
export const api = createApiClient({
  baseUrls: {
    asmaulHusna: process.env.EXPO_PUBLIC_ASMAUL_HUSNA_API,
    hadith: process.env.EXPO_PUBLIC_HADITH_API,
    nominatim: process.env.EXPO_PUBLIC_NOMINATIM_API,
    prayer: process.env.EXPO_PUBLIC_JADWAL_SHOLAT_API,
    puasaSunnah: process.env.EXPO_PUBLIC_PUASA_SUNNAH_API,
    quran: process.env.EXPO_PUBLIC_QURAN_API,
  },
  // Nominatim's usage policy asks apps to identify themselves.
  headers: {
    "User-Agent": `JadwalSholat-Android/${Constants.expoConfig?.version ?? "1.0.0"} (+https://jdwshlt.ekel.dev)`,
  },
});

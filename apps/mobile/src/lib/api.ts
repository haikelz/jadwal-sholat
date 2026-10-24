import { createApiClient } from "@jadwal-sholat/core/api";
import Constants from "expo-constants";

// ponytail: the same public endpoints as the website's public-env.ts, fixed in code.
// Move them to EXPO_PUBLIC_* variables if a staging API ever appears.
export const api = createApiClient({
  baseUrls: {
    asmaulHusna: "https://asmaul-husna-api.vercel.app",
    hadith: "https://hadith.ekel.dev",
    nominatim: "https://nominatim.openstreetmap.org",
    prayer: "https://api.aladhan.com/v1/calendar",
    puasaSunnah: "https://puasasunnah.ekel.dev",
    quran: "https://quran.ekel.dev",
  },
  // Nominatim's usage policy asks apps to identify themselves.
  headers: {
    "User-Agent": `JadwalSholat-Android/${Constants.expoConfig?.version ?? "1.0.0"} (+https://jdwshlt.ekel.dev)`,
  },
});

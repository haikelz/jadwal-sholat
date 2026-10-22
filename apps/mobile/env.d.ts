// The public API base URLs from .env (see .env.example). app.config.ts stops
// an EAS build when one is missing, so the app treats them as set.
declare namespace NodeJS {
  interface ProcessEnv {
    readonly EXPO_PUBLIC_ASMAUL_HUSNA_API: string;
    readonly EXPO_PUBLIC_HADITH_API: string;
    readonly EXPO_PUBLIC_JADWAL_SHOLAT_API: string;
    readonly EXPO_PUBLIC_NOMINATIM_API: string;
    readonly EXPO_PUBLIC_PUASA_SUNNAH_API: string;
    readonly EXPO_PUBLIC_QURAN_API: string;
  }
}

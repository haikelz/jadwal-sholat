import { DEFAULT_QORI } from "@jadwal-sholat/core/quran";
import { PRAYERS, type PrayerKey } from "@jadwal-sholat/core/prayer";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storage } from "./storage";

export type ThemePreference = "system" | "light" | "dark";

type PreferencesState = {
  theme: ThemePreference;
  qori: number;
  /** Show each ayah's Latin transliteration. */
  showLatin: boolean;
  /** Show the per-ayah play buttons. */
  showAudio: boolean;
  adzanEnabled: boolean;
  /** Prayers that get an adzan alarm. */
  adzanPrayers: PrayerKey[];
  setTheme: (theme: ThemePreference) => void;
  setQori: (qori: number) => void;
  setShowLatin: (showLatin: boolean) => void;
  setShowAudio: (showAudio: boolean) => void;
  setAdzanEnabled: (adzanEnabled: boolean) => void;
  setAdzanPrayers: (adzanPrayers: PrayerKey[]) => void;
};

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: "system",
      qori: DEFAULT_QORI,
      showLatin: false,
      showAudio: false,
      adzanEnabled: false,
      adzanPrayers: PRAYERS.map((prayer) => prayer.key),
      setTheme: (theme) => set({ theme }),
      setQori: (qori) => set({ qori }),
      setShowLatin: (showLatin) => set({ showLatin }),
      setShowAudio: (showAudio) => set({ showAudio }),
      setAdzanEnabled: (adzanEnabled) => set({ adzanEnabled }),
      setAdzanPrayers: (adzanPrayers) => set({ adzanPrayers }),
    }),
    { name: "preferences", storage },
  ),
);

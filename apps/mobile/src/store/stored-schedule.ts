import type { PrayerDay } from "@jadwal-sholat/core/schemas";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storage } from "./storage";

export type StoredSchedule = {
  /** "yyyy-MM" */
  month: string;
  /** "lat,lng" the month was fetched for. */
  place: string;
  days: PrayerDay[];
};

type StoredScheduleState = {
  schedule: StoredSchedule | null;
  setSchedule: (schedule: StoredSchedule) => void;
};

/**
 * The last prayer month fetched: shown offline, and read by the adzan
 * scheduler without a network request.
 */
export const useStoredSchedule = create<StoredScheduleState>()(
  persist(
    (set) => ({
      schedule: null,
      setSchedule: (schedule) => set({ schedule }),
    }),
    { name: "stored-schedule", storage },
  ),
);

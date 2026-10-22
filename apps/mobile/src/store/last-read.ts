import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storage } from "./storage";

export type LastRead = {
  surah: number;
  /** Latin surah name, e.g. "Al-Kahf". */
  name: string;
  /** 1-based ayah number within the surah. */
  ayah: number;
};

type LastReadState = {
  lastRead: LastRead | null;
  setLastRead: (lastRead: LastRead) => void;
};

export const useLastRead = create<LastReadState>()(
  persist(
    (set) => ({
      lastRead: null,
      setLastRead: (lastRead) => set({ lastRead }),
    }),
    { name: "last-read", storage },
  ),
);

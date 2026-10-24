import type { LastReadSliceProps } from "@/interfaces";
import type { StateCreator } from "zustand";

const lastReadSlice: StateCreator<
  LastReadSliceProps,
  [],
  [],
  LastReadSliceProps
> = (set) => ({
  lastRead: {
    id: "",
    name: "",
    ayat: null,
    number: null,
  },
  setLastRead: (lastRead) => set({ lastRead: lastRead }),
});

export default lastReadSlice;

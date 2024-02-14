import { StateCreator } from "zustand";
import { LastReadSliceProps } from "~interfaces";

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

import { StateCreator } from "zustand";
import { LastReadProps } from "~models";

const createLastReadSlice: StateCreator<LastReadProps, [], [], LastReadProps> = (set) => ({
  lastRead: {
    id: "",
    name: "",
    ayat: null,
    number: null,
  },
  setLastRead: (lastRead) => set(() => ({ lastRead: lastRead })),
});

export default createLastReadSlice;

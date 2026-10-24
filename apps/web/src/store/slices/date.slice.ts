import type { DateSliceProps } from "@/interfaces";
import type { StateCreator } from "zustand";

const dateSlice: StateCreator<DateSliceProps, [], [], DateSliceProps> = (
  set,
) => ({
  date: new Date(),
  setDate: (func: Function) => set({ date: func() }),
});

export default dateSlice;

import { DateSliceProps } from "@/interfaces";
import { StateCreator } from "zustand";

const dateSlice: StateCreator<DateSliceProps, [], [], DateSliceProps> = (
  set
) => ({
  date: new Date(),
  setDate: (func: Function) => set({ date: func() }),
});

export default dateSlice;

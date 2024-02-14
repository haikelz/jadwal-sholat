import { StateCreator } from "zustand";
import { DateSliceProps } from "~interfaces";

const dateSlice: StateCreator<DateSliceProps, [], [], DateSliceProps> = (
  set
) => ({
  date: new Date(),
  setDate: (func: Function) => set({ date: func() }),
});

export default dateSlice;

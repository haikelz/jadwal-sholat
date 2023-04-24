import { StateCreator } from "zustand";
import { DateSliceProps } from "~models";

const dateSlice: StateCreator<DateSliceProps, [], [], DateSliceProps> = (set) => ({
  date: new Date(),
  setDate: (func: Function) => set({ date: func() }),
});

export default dateSlice;

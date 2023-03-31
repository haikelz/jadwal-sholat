import { StateCreator } from "zustand";
import { DateProps } from "~models";

const createDateSlice: StateCreator<DateProps, [], [], DateProps> = (set) => ({
  date: new Date(),
  setDate: (func: Function) => set(() => ({ date: func() })),
});

export default createDateSlice;

import { StateCreator } from "zustand";
import { IsAscendingSliceProps } from "~interfaces";

const isAscendingSlice: StateCreator<
  IsAscendingSliceProps,
  [],
  [],
  IsAscendingSliceProps
> = (set) => ({
  isAscending: false,
  setIsAscending: (isAscending: boolean) => set({ isAscending: isAscending }),
});

export default isAscendingSlice;

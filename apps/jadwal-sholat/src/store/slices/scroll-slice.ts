import { StateCreator } from "zustand";
import { ScrollSliceProps } from "~interfaces";

const scrollSlice: StateCreator<ScrollSliceProps, [], [], ScrollSliceProps> = (
  set
) => ({
  scroll: 0,
  setScroll: (scroll: number) => set({ scroll: scroll }),
});

export default scrollSlice;

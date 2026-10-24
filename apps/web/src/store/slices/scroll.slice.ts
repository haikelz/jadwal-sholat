import type { ScrollSliceProps } from "@/interfaces";
import type { StateCreator } from "zustand";

const scrollSlice: StateCreator<ScrollSliceProps, [], [], ScrollSliceProps> = (
  set,
) => ({
  scroll: 0,
  setScroll: (scroll: number) => set({ scroll: scroll }),
});

export default scrollSlice;

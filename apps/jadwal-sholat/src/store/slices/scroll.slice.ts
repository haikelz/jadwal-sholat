import { ScrollSliceProps } from "@/interfaces";
import { StateCreator } from "zustand";

const scrollSlice: StateCreator<ScrollSliceProps, [], [], ScrollSliceProps> = (
  set
) => ({
  scroll: 0,
  setScroll: (scroll: number) => set({ scroll: scroll }),
});

export default scrollSlice;

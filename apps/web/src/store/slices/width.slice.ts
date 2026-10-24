import type { WidthSliceProps } from "@/interfaces";
import type { StateCreator } from "zustand";

const widthSlice: StateCreator<WidthSliceProps, [], [], WidthSliceProps> = (
  set,
) => ({
  width: 0,
  setWidth: (width: number) => set({ width: width }),
});

export default widthSlice;

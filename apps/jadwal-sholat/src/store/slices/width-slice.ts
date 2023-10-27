import { StateCreator } from "zustand";
import { WidthSliceProps } from "~interfaces";

const widthSlice: StateCreator<WidthSliceProps, [], [], WidthSliceProps> = (
  set
) => ({
  width: 0,
  setWidth: (width: number) => set({ width: width }),
});

export default widthSlice;

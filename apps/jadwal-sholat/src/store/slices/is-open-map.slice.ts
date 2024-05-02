import { StateCreator } from "zustand";
import { IsOpenMapProps } from "~interfaces";

const isOpenMapSlice: StateCreator<IsOpenMapProps, [], [], IsOpenMapProps> = (
  set
) => ({
  isOpenMap: false,
  setIsOpenMap: (isOpenMap) => set({ isOpenMap: isOpenMap }),
});

export default isOpenMapSlice;

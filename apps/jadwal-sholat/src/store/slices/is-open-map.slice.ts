import { IsOpenMapProps } from "@/interfaces";
import { StateCreator } from "zustand";

const isOpenMapSlice: StateCreator<IsOpenMapProps, [], [], IsOpenMapProps> = (
  set
) => ({
  isOpenMap: false,
  setIsOpenMap: (isOpenMap) => set({ isOpenMap: isOpenMap }),
});

export default isOpenMapSlice;

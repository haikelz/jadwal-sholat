import { NumberModalAsmaulHusnaSliceProps } from "@/interfaces";
import { StateCreator } from "zustand";

const numberModalAsmaulHusnaSlice: StateCreator<
  NumberModalAsmaulHusnaSliceProps,
  [],
  [],
  NumberModalAsmaulHusnaSliceProps
> = (set) => ({
  numberModalAsmaulHusna: 0,
  setNumberModalAsmaulHusna: (numberModalAsmaulHusna) =>
    set({ numberModalAsmaulHusna: numberModalAsmaulHusna }),
  dataAsmaulHusna: {
    urutan: "",
    latin: "",
    arab: "",
    arti: "",
  },
  setDataAsmaulHusna: (dataAsmaulHusna) =>
    set({ dataAsmaulHusna: dataAsmaulHusna }),
});

export default numberModalAsmaulHusnaSlice;

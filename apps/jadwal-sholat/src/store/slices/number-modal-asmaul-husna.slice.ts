import { StateCreator } from "zustand";
import { numberModalAsmaulHusnaSliceProps } from "~interfaces";

const numberModalAsmaulHusnaSlice: StateCreator<
  numberModalAsmaulHusnaSliceProps,
  [],
  [],
  numberModalAsmaulHusnaSliceProps
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

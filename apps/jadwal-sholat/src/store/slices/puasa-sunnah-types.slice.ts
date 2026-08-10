import { PuasaSunnahTypesSliceProps } from "@/interfaces/puasa-sunnah.interface";
import { bulan } from "@/lib/utils/constants";
import { StateCreator } from "zustand";

const puasaSunnahTypesSlice: StateCreator<
  PuasaSunnahTypesSliceProps,
  [],
  [],
  PuasaSunnahTypesSliceProps
> = (set) => ({
  selectedMonth: bulan,
  setSelectedMonth: ({ selectedMonth }: { selectedMonth: string }) =>
    set({ selectedMonth }),
  selectedType: "all",
  setSelectedType: ({ selectedType }) =>
    set({
      selectedType,
    }),
});

export default puasaSunnahTypesSlice;

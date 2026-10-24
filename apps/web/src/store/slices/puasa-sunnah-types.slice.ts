import type { PuasaSunnahTypesSliceProps } from "@/interfaces/puasa-sunnah.interface";
import type { StateCreator } from "zustand";

const puasaSunnahTypesSlice: StateCreator<
  PuasaSunnahTypesSliceProps,
  [],
  [],
  PuasaSunnahTypesSliceProps
> = (set) => ({
  // null until the reader picks one; the page falls back to the current month.
  selectedMonth: null,
  setSelectedMonth: ({ selectedMonth }: { selectedMonth: string }) =>
    set({ selectedMonth }),
  selectedType: "all",
  setSelectedType: ({ selectedType }) =>
    set({
      selectedType,
    }),
});

export default puasaSunnahTypesSlice;

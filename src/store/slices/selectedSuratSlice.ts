import { StateCreator } from "zustand";
import { SelectedSuratProps } from "~models";

const selectedSuratSlice: StateCreator<SelectedSuratProps, [], [], SelectedSuratProps> = (set) => ({
  selectedSurat: "",
  setSelectedSurat: (selectedSurat) => set({ selectedSurat: selectedSurat }),
});

export default selectedSuratSlice;

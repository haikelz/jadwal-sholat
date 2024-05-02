import { StateCreator } from "zustand";
import { LocationPositionProps } from "~interfaces";

// Default position to Kota Bandung
const locationPositionSlice: StateCreator<
  LocationPositionProps,
  [],
  [],
  LocationPositionProps
> = (set) => ({
  position: { lat: -6.905977, lng: 107.613144 },
  setPosition: (pos) => set({ position: pos }),
});

export default locationPositionSlice;

import { DEFAULT_POSITION, type Coordinates } from "@jadwal-sholat/core/prayer";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storage } from "./storage";

/** "default" until the reader allows GPS or picks a city. */
export type LocationSource = "default" | "gps" | "manual";

type LocationState = {
  position: Coordinates;
  /** City name for the header; null until it's known. */
  label: string | null;
  source: LocationSource;
  setLocation: (location: {
    position: Coordinates;
    label: string | null;
    source: LocationSource;
  }) => void;
};

export const useLocation = create<LocationState>()(
  persist(
    (set) => ({
      position: DEFAULT_POSITION,
      label: "Kota Bandung",
      source: "default",
      setLocation: (location) => set(location),
    }),
    { name: "location", storage },
  ),
);

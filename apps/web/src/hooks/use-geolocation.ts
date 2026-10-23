import { LocationPositionProps } from "@/interfaces";
import useGlobalStore from "@/store";
import { useEffect, useState } from "react";

type Position = LocationPositionProps["position"];

const STORAGE_KEY = "position";
// Stop waiting for a permission prompt and fetch with what we have.
const TIMEOUT_MS = 3000;

// ~1km precision: prayer times don't change at that scale, and a stable value
// keeps the schedule's query key (and cache) the same between visits.
function round(value: number) {
  return Math.round(value * 100) / 100;
}

function readSavedPosition(): Position | null {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    return typeof saved?.lat === "number" && typeof saved?.lng === "number"
      ? { lat: saved.lat, lng: saved.lng }
      : null;
  } catch {
    return null;
  }
}

/**
 * Resolves the reader's position and reports when it is settled, so the
 * schedule fetches once instead of once for the default city and again for
 * the real location.
 */
export function useGeolocation() {
  const { setPosition } = useGlobalStore((state) => ({
    setPosition: state.setPosition,
  }));
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = readSavedPosition();
    if (saved) {
      setPosition(saved);
      setIsReady(true);
    }

    if (!("geolocation" in navigator)) {
      setIsReady(true);
      return;
    }

    const timeout = setTimeout(() => setIsReady(true), TIMEOUT_MS);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const position = {
          lat: round(coords.latitude),
          lng: round(coords.longitude),
        };
        setPosition(position);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
        } catch {
          // Storage can be blocked; the position still applies this visit.
        }
        clearTimeout(timeout);
        setIsReady(true);
      },
      () => {
        clearTimeout(timeout);
        setIsReady(true);
      },
      { maximumAge: 10 * 60 * 1000 },
    );

    return () => clearTimeout(timeout);
  }, [setPosition]);

  return isReady;
}

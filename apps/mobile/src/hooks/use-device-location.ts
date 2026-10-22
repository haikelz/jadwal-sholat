import { useEffect, useState } from "react";
import { locateDevice } from "@/lib/locate-device";
import { useLocation } from "@/store/location";

// One GPS attempt per app session; tab screens remount on navigation.
let attempted = false;

/**
 * Refreshes the saved position from GPS unless the reader picked a city by
 * hand. Returns true once the position is good to fetch with: right away
 * when one is saved, otherwise after the first GPS attempt, so a first launch
 * fetches the real city instead of the default one and then again.
 */
export function useDeviceLocation() {
  const source = useLocation((state) => state.source);
  const setLocation = useLocation((state) => state.setLocation);
  const [settled, setSettled] = useState(source !== "default" || attempted);

  useEffect(() => {
    if (attempted || source === "manual") return;
    attempted = true;

    locateDevice().then((result) => {
      if (result) setLocation({ ...result, source: "gps" });
      setSettled(true);
    });
  }, [setLocation, source]);

  return settled;
}

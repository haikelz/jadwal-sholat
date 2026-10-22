import { useEffect, useState } from "react";
import { useLastRead } from "./last-read";
import { useLocation } from "./location";
import { usePreferences } from "./preferences";
import { useStoredSchedule } from "./stored-schedule";

const stores = [usePreferences, useLocation, useLastRead, useStoredSchedule];

const allHydrated = () => stores.every((store) => store.persist.hasHydrated());

/** True once every persisted store has read AsyncStorage. */
export function useStoresHydrated() {
  const [hydrated, setHydrated] = useState(allHydrated);

  useEffect(() => {
    if (hydrated) return;
    const unsubscribes = stores.map((store) =>
      store.persist.onFinishHydration(() => setHydrated(allHydrated())),
    );
    setHydrated(allHydrated());
    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, [hydrated]);

  return hydrated;
}

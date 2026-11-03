import { useSyncExternalStore } from "react";
import { useLastRead } from "./last-read";
import { useLocation } from "./location";
import { usePreferences } from "./preferences";
import { useStoredSchedule } from "./stored-schedule";

const stores = [usePreferences, useLocation, useLastRead, useStoredSchedule];

// Latches: a later rehydrate() (the background adzan task) must not send the
// app back to the splash screen.
let hydrated = false;
const getHydrated = () =>
  (hydrated ||= stores.every((store) => store.persist.hasHydrated()));

const subscribe = (onChange: () => void) => {
  const unsubscribes = stores.map((store) => store.persist.onFinishHydration(onChange));
  return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
};

/** True once every persisted store has read AsyncStorage. */
export function useStoresHydrated() {
  return useSyncExternalStore(subscribe, getHydrated);
}

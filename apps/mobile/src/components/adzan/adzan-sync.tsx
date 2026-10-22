import { setAdzanBackgroundTask } from "@/lib/adzan/background";
import {
  ensureAdzanChannels,
  getLastAdzanSync,
  syncAdzanNotifications,
} from "@/lib/adzan/notifications";
import { useLocation } from "@/store/location";
import { usePreferences } from "@/store/preferences";
import { useStoredSchedule } from "@/store/stored-schedule";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { AppState } from "react-native";

const RESYNC_AFTER_MS = 12 * 60 * 60 * 1000;

// An adzan that fires while the app is open still shows and plays.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function sync() {
  // A failed sync keeps the previous alarms; the next trigger retries.
  syncAdzanNotifications().catch(() => {});
}

/**
 * Keeps the scheduled adzan alarms in step with the settings, location and
 * schedule. Rendered once in the root layout, after the stores hydrate.
 */
export function AdzanSync() {
  const enabled = usePreferences((state) => state.adzanEnabled);
  const prayers = usePreferences((state) => state.adzanPrayers);
  const lat = useLocation((state) => state.position.lat);
  const lng = useLocation((state) => state.position.lng);
  const month = useStoredSchedule((state) => state.schedule?.month);
  const place = useStoredSchedule((state) => state.schedule?.place);

  useEffect(() => {
    ensureAdzanChannels().catch(() => {});
  }, []);

  useEffect(() => {
    sync();
  }, [enabled, prayers, lat, lng, month, place]);

  useEffect(() => {
    setAdzanBackgroundTask(enabled).catch(() => {});
  }, [enabled]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (status) => {
      if (status === "active" && Date.now() - getLastAdzanSync() > RESYNC_AFTER_MS) {
        sync();
      }
    });
    return () => subscription.remove();
  }, []);

  return null;
}

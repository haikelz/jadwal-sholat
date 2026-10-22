import { useLocation } from "@/store/location";
import { usePreferences } from "@/store/preferences";
import { useStoredSchedule } from "@/store/stored-schedule";
import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import { isExpoGo, syncAdzanNotifications } from "./notifications";

const ADZAN_TASK = "adzan-resync";
// Alarms cover the rest of the month; a daily run rolls them into the next
// one even when the app stays closed.
const DAILY_MINUTES = 24 * 60;

// TaskManager requires tasks defined at module scope, before the app renders.
// Expo Go on Android has no TaskManager.
if (!isExpoGo) {
  TaskManager.defineTask(ADZAN_TASK, async () => {
    try {
      // A background run can start before the persisted stores have loaded.
      await Promise.all([
        usePreferences.persist.rehydrate(),
        useLocation.persist.rehydrate(),
        useStoredSchedule.persist.rehydrate(),
      ]);
      await syncAdzanNotifications();
      return BackgroundTask.BackgroundTaskResult.Success;
    } catch {
      return BackgroundTask.BackgroundTaskResult.Failed;
    }
  });
}

/** Registers the daily re-sync while adzan is on, and removes it when off. */
export async function setAdzanBackgroundTask(enabled: boolean) {
  if (isExpoGo || !(await TaskManager.isAvailableAsync())) return;

  const registered = await TaskManager.isTaskRegisteredAsync(ADZAN_TASK);
  if (enabled && !registered) {
    await BackgroundTask.registerTaskAsync(ADZAN_TASK, {
      minimumInterval: DAILY_MINUTES,
    });
  } else if (!enabled && registered) {
    await BackgroundTask.unregisterTaskAsync(ADZAN_TASK);
  }
}

import { useEffect, useState } from "react";
import { AppState } from "react-native";

/**
 * The current time, refreshed every `intervalMs` and whenever the app comes
 * back to the foreground, so a screen left open overnight shows today.
 */
export function useNow(intervalMs = 30_000) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    const subscription = AppState.addEventListener("change", (status) => {
      if (status === "active") setNow(new Date());
    });
    return () => {
      clearInterval(id);
      subscription.remove();
    };
  }, [intervalMs]);

  return now;
}

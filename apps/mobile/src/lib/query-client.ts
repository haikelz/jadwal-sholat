import { focusManager, QueryClient } from "@tanstack/react-query";
import { AppState } from "react-native";

// React Query refetches stale data on window focus; on a phone that's the
// app coming back to the foreground.
AppState.addEventListener("change", (status) => {
  focusManager.setFocused(status === "active");
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60 * 60 * 1000,
    },
  },
});

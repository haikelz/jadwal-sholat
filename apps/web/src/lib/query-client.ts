import { QueryClient } from "@tanstack/react-query";

// One client for every island: islands on a page share a cache, and the
// client router keeps this module alive, so the cache survives navigation.
export const queryClient = new QueryClient({
  defaultOptions: {
    // Schedules, surahs and hadith barely change; reuse what was fetched
    // instead of refetching on every visit to a page.
    queries: { staleTime: 60 * 60 * 1000 },
  },
});

import { useEffect, useState } from "react";

/**
 * The current time, refreshed every `intervalMs`.
 *
 * It is `null` on the server and on the first client render, so prerendered
 * pages never bake in the build date and hydration stays consistent. Read the
 * clock through this hook instead of module-level `new Date()` calls, which
 * freeze at load and go stale after midnight.
 */
export function useNow(intervalMs = 30_000) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}

import { useEffect, useState } from "react";

type StoredCopy<T> = { scope: string; value: T };

/**
 * Keeps the last fetched `value` in localStorage under `storageKey` and
 * returns the stored copy when it belongs to the same `scope` (for example the
 * current month). Pages show it while the network loads or when it fails, so
 * the schedule still opens offline.
 *
 * ponytail: one entry per key, overwritten on every success; enough for "the
 * schedule I last saw". Upgrade path: a persisted react-query cache.
 */
export function useStoredCopy<T>(
  storageKey: string,
  scope: string,
  value: T | undefined,
): T | undefined {
  const [stored, setStored] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (!scope) return;
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? (JSON.parse(raw) as StoredCopy<T>) : null;
      setStored(parsed?.scope === scope ? parsed.value : undefined);
    } catch {
      setStored(undefined);
    }
  }, [storageKey, scope]);

  useEffect(() => {
    if (!scope || value === undefined) return;
    try {
      const entry: StoredCopy<T> = { scope, value };
      localStorage.setItem(storageKey, JSON.stringify(entry));
    } catch {
      // Storage full or blocked: the live data still renders.
    }
  }, [storageKey, scope, value]);

  return stored;
}

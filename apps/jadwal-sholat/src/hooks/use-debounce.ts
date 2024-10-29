import { useEffect, useState } from "react";

/**
 * A custom hook to debounce search value
 * @export
 * @template T
 * @param {T} value
 * @param {number} [delay=500]
 * @returns {*}
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, value, setDebouncedValue]);

  return debouncedValue;
}

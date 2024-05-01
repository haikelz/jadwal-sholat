"use client";

import { RefObject, useCallback, useEffect } from "react";
import { P, match } from "ts-pattern";

/**
 * A custom hook that contains logic for close a modal if we click outside
 * @export
 * @template T
 * @param {(param: T) => void} set - setter
 * @param {RefObject<HTMLDivElement>} ref - reference to div modal element
 * @param {T} value - value
 */
export function useClickOutside<T>(
  set: (param: T) => void,
  ref: RefObject<HTMLDivElement>,
  value: T
): void {
  const handleClickOutside = useCallback(
    (e: Event) => {
      match({ current: ref.current }).with(
        {
          current: P.when(
            (current) =>
              current && !ref.current?.contains(e.target as HTMLDivElement)
          ),
        },
        () => {
          set(value);
        }
      );
    },
    [ref, set, value]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);
}

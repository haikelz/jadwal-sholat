import { MutableRefObject, useCallback, useEffect } from "react";
import { KeydownEvent } from "../interfaces";

export const useKeydown = <T extends MutableRefObject<string | any>>(
  ref: T,
  isShiftKey: boolean,
  key1: string,
  key2: string
) => {
  const handleKeydown = useCallback(<T extends KeydownEvent>(event: T) => {
    // Jika user menekan kombinasi "Shift" dan "Enter", maka focus ke input
    if (event.shiftKey === isShiftKey && event.key === key1) {
      ref.current?.focus();
    }

    // Jika user menekan key "Escape" atau Esc, maka unfocus input
    if (event.key === key2) {
      ref.current?.blur();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown, true);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);
};

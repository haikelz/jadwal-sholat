import { useCallback, useEffect } from "react";
import { Keydown, KeydownEvent } from "@/interfaces";

export const useKeydown = <T extends Keydown>({ ref, isShiftKey, key1, key2 }: T) => {
  const handleKeydown = useCallback(<T extends KeydownEvent>(event: T) => {
    //Jika shift key ditekan dan key1 ditekan, maka input search bakal focus
    if (event.shiftKey === isShiftKey && event.key === key1) {
      ref.current?.focus();
    }

    // Jika key2 ditekan, maka input akan blur alias kembali ke keadaan semula
    if (event.key === key2) {
      ref.current?.blur();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown, true);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return {
    ref: ref,
    isShiftKey: isShiftKey,
    key1: key1,
    key2: key2,
  };
};

import { RefObject, useCallback, useEffect } from "react";

interface KeydownProps {
  ref: RefObject<HTMLInputElement>;
  isShiftKey: boolean;
  key1: string;
  key2: string;
}

interface KeydownEventProps {
  shiftKey: boolean;
  key: string;
}

export function useKeydown<T extends KeydownProps>({ ref, isShiftKey, key1, key2 }: T) {
  const handleKeydown = useCallback(
    <T extends KeydownEventProps>(event: T) => {
      //Jika shift key ditekan dan key1 ditekan, maka input search bakal focus
      if (event.shiftKey === isShiftKey && event.key === key1) ref.current?.focus();

      // Jika key2 ditekan, maka input akan blur alias kembali ke keadaan semula
      if (event.key === key2) ref.current?.blur();
    },
    [isShiftKey, key1, key2, ref]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown, true);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  return {
    ref: ref,
    isShiftKey: isShiftKey,
    key1: key1,
    key2: key2,
  };
}

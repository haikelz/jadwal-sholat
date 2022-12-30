import { useCallback, useEffect } from "react";
import { SetStateAction, useAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { scrollAtom } from "@/store";

type HandleScroll = () => void;
type Scroll = [number, (update: SetStateAction<number>) => void];

export const useScroll = () => {
  const [scroll, setScroll]: Scroll = useAtom(scrollAtom);

  // buat handle warning useEffect pas pengecekan
  const handleScroll: HandleScroll = useAtomCallback(
    useCallback(() => {
      const position = window.pageYOffset;
      setScroll(position);
    }, [setScroll])
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return [scroll] as const;
};

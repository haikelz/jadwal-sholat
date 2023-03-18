import { useAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { useCallback, useEffect } from "react";
import { scrollAtom } from "~store";

export const useScroll = () => {
  const [scroll, setScroll] = useAtom(scrollAtom);

  // buat handle warning useEffect pas pengecekan
  const handleScroll = useAtomCallback(
    useCallback(() => {
      const position = window.pageYOffset;
      setScroll(position);
    }, [setScroll])
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return scroll;
};

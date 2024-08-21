import { useCallback, useEffect } from "react";
import useGlobalStore from "~store";

/**
 * A custom hook to get height value, based on user's scroll
 * @returns {number} scroll value
 */
export function useScroll(): number {
  const { scroll, setScroll } = useGlobalStore((state) => ({
    scroll: state.scroll,
    setScroll: state.setScroll,
  }));

  const handleScroll = useCallback(() => {
    setScroll(window.scrollY);
  }, [setScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return scroll;
}

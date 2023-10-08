"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * A custom hook to get height value, based on user's scroll
 * @returns {number} scroll value
 */
export function useScroll(): number {
  const [scroll, setScroll] = useState<number>(0);

  const handleScroll = useCallback(() => {
    setScroll(() => window.pageYOffset);
  }, [setScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return scroll;
}

"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * A custom hook to get width in percent, on user's scroll
 * @returns {number} width value
 */
export function useWidth(): number {
  const [width, setWidth] = useState<number>(0);

  const handleScroll = useCallback(() => {
    const el = document.documentElement;

    const scrollTop = el.scrollTop || document.body.scrollTop;
    const scrollHeight = el.scrollHeight || document.body.scrollHeight;

    const percent = (scrollTop / (scrollHeight - el.clientHeight)) * 100;

    setWidth(percent);
  }, [setWidth]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return width;
}

"use client";

import useGlobalStore from "@/store";
import { useCallback, useEffect } from "react";

export function ReadingProgress() {
  const { width, setWidth } = useGlobalStore((state) => ({
    width: state.width,
    setWidth: state.setWidth,
  }));

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

  const roundPercent = Math.round(width);

  return <span className="text-sm font-bold">{roundPercent}%</span>;
}

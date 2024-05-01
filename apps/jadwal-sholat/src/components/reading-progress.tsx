"use client";

import { useCallback, useEffect } from "react";
import { cn } from "~lib/utils/cn";
import useGlobalStore from "~store";

export default function ReadingProgress() {
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

  return (
    <div
      style={{ width: width + "%" }}
      className={cn("fixed z-10 h-1 bg-gray-950", "dark:bg-gray-50")}
    ></div>
  );
}

"use client";

import { useCallback, useEffect } from "react";
import { cx } from "~lib/helpers";
import useGlobalStore from "~store";

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

  return (
    <div
      style={{ width: width + "%" }}
      className={cx("fixed z-10 h-1 bg-rose-400", "dark:bg-blue-500")}
    ></div>
  );
}

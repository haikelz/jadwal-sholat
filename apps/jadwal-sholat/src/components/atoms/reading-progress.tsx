"use client";

import { cx } from "classix";
import { useCallback, useEffect, useState } from "react";

export function ReadingProgress() {
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

  return (
    <div
      style={{ width: width + "%" }}
      className={cx("fixed z-10 h-1.5 bg-rose-400", "dark:bg-blue-500")}
    ></div>
  );
}

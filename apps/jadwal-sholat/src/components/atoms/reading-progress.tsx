"use client";

import { cx } from "classix";
import { useWidth } from "~hooks/use-width";

export function ReadingProgress(): JSX.Element {
  const width = useWidth();

  return (
    <div
      style={{ width: width + "%" }}
      className={cx("fixed z-10 h-1 bg-rose-400", "dark:bg-blue-500")}
    ></div>
  );
}

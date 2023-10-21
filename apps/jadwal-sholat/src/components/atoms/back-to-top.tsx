"use client";

import { cx } from "classix";
import { ArrowUp } from "lucide-react";
import { memo } from "react";
import { useScroll } from "~hooks";

export function BackToTop(): JSX.Element {
  const scroll = useScroll();
  const height = 150;

  return (
    <>
      {scroll >= height ? (
        <div className={cx("fixed bottom-18 right-2.5", "md:right-4 md:bottom-4")}>
          <button
            type="button"
            aria-label="back to top"
            className={cx(
              "rounded-md bg-rose-400 p-1.5 transition-all",
              "hover:bg-rose-500",
              "dark:bg-blue-500 dark:hover:bg-blue-600"
            )}
            onClick={() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <ArrowUp className="text-white" />
          </button>
        </div>
      ) : null}
    </>
  );
}

memo(BackToTop);

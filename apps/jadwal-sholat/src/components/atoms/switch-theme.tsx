"use client";

import { cx } from "classix";
import { useTheme } from "next-themes";
import { memo } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export function SwitchTheme({
  flexDir,
  isHidden,
  justifyItems,
  isMarginLeft,
}: {
  flexDir: string;
  isHidden?: boolean;
  justifyItems: string;
  isMarginLeft: boolean;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cx(
        `w-full items-center justify-${justifyItems}`,
        isHidden ? "hidden md:flex" : "flex"
      )}
    >
      <button
        type="button"
        aria-label="switch theme"
        className={cx(
          `flex flex-${flexDir} cursor-pointer items-center justify-center`,
          "px-4 text-gray-500",
          "dark:text-gray-400"
        )}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "light" ? <MdDarkMode size={28} /> : <MdLightMode size={28} />}
        <p className={cx("hidden text-sm font-semibold", "md:block", isMarginLeft ? "ml-2" : "")}>
          {theme === "light" ? "Dark" : "Light"}
        </p>
      </button>
    </div>
  );
}

memo(SwitchTheme);

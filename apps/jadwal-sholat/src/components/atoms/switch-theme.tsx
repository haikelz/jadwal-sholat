"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { match } from "ts-pattern";
import { cx } from "~lib/helpers";

export function SwitchTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="switch theme"
      className={cx(
        "px-4 text-gray-500",
        "dark:text-gray-400 md:flex md:justify-center md:items-center md:flex-col p-2 md:p-2.5"
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {match(theme)
        .with("light", () => <Moon size={24} />)
        .otherwise(() => (
          <Sun size={24} />
        ))}
      <p className={cx("hidden text-sm font-bold", "md:block")}>
        {match(theme)
          .with("light", () => "Dark")
          .otherwise(() => "Light")}
      </p>
    </button>
  );
}

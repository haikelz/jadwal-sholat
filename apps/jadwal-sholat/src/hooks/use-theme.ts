"use client";

import { useEffect } from "react";
import { browser } from "~lib/utils/constants";
import useGlobalStore from "~store";

export function useTheme() {
  const { theme, setTheme } = useGlobalStore((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
  }));

  useEffect(() => {
    if (!browser) return;
    const body = document.body;

    localStorage.setItem("theme", theme);
    body.classList.remove("light", "dark");
    body.classList.add(theme);
  }, [theme]);

  return [theme, setTheme] as const;
}

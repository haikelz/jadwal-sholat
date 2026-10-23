import { useEffect, useState } from "react";

export type ThemeChoice = "light" | "dark" | "system";

// The key next-themes used on the Next site, so saved choices carry over.
const STORAGE_KEY = "theme";

function readTheme(): ThemeChoice {
  try {
    const theme = localStorage.getItem(STORAGE_KEY);
    return theme === "light" || theme === "dark" ? theme : "system";
  } catch {
    return "system";
  }
}

/** The reader's theme choice; applying it goes through the <head> script. */
export function useTheme() {
  const [theme, setThemeState] = useState<ThemeChoice>("system");

  useEffect(() => setThemeState(readTheme()), []);

  function setTheme(next: string) {
    const choice: ThemeChoice =
      next === "light" || next === "dark" ? next : "system";
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Blocked storage: the head script can't read the choice back, so
      // the theme stays as it is.
    }
    setThemeState(choice);
    window.__applyDisplay?.();
  }

  return { theme, setTheme };
}

import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { browser } from "~lib/utils/constants";
import useAppStore from "~store";

export function useTheme() {
  const { theme, setTheme } = useAppStore(
    (state) => ({
      theme: state.theme,
      setTheme: state.setTheme,
    }),
    shallow
  );

  useEffect(() => {
    if (!browser) return;
    const body = document.body;

    localStorage.setItem("theme", theme);
    body.classList.remove("light", "dark");
    body.classList.add(theme);
  }, [theme]);

  return [theme, setTheme] as const;
}

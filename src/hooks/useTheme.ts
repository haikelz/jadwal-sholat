import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";

const browser = typeof window !== "undefined";
const themeAtom = atomWithStorage(
  "theme",
  browser && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
);

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    if (!browser) return;
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return [theme, setTheme] as const;
};

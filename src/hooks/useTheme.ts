import { useEffect, useState } from "react";

const browser = typeof window !== "undefined";
const localValue = browser ? localStorage.getItem("theme") : "light";
const systemTheme =
  browser && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const useTheme = () => {
  const [theme, setTheme] = useState<string>(localValue || systemTheme);

  useEffect(() => {
    if (!browser) return;
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return [theme, setTheme] as const;
};

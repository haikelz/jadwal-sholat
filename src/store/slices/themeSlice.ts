import { StateCreator } from "zustand";
import { browser } from "~lib/utils/constants";
import { ThemeSliceProps } from "~models";

const localValue = browser ? localStorage.getItem("theme") : "light";
const systemTheme =
  browser && matchMedia("(prefers-color-scheme: light)").matches ? "dark" : "light";

const themeSlice: StateCreator<ThemeSliceProps, [], [], ThemeSliceProps> = (set) => ({
  theme: localValue || systemTheme,
  setTheme: (theme) => set({ theme: theme }),
});

export default themeSlice;

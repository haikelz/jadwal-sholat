import { DarkTheme, DefaultTheme, type Theme } from "expo-router";

// The same tokens as src/global.css, for places that take a color value
// instead of a class: navigation, the tab bar, icons and the status bar.
export const THEME = {
  light: {
    background: "#ffffff",
    border: "#e5e5e5",
    card: "#ffffff",
    destructive: "#e7000b",
    foreground: "#0a0a0a",
    muted: "#f5f5f5",
    mutedForeground: "#737373",
    primary: "#171717",
  },
  dark: {
    background: "#0a0a0a",
    border: "#262626",
    card: "#171717",
    destructive: "#ff6467",
    foreground: "#fafafa",
    muted: "#262626",
    mutedForeground: "#a1a1a1",
    primary: "#e5e5e5",
  },
};

export const NAV_THEME: Record<"light" | "dark", Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.background,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.background,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};

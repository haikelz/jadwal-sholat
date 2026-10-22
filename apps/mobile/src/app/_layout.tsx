import "../global.css";

import { AdzanSync } from "@/components/adzan/adzan-sync";
import { queryClient } from "@/lib/query-client";
import { NAV_THEME } from "@/lib/theme";
import { useStoresHydrated } from "@/store/hydration";
import { usePreferences } from "@/store/preferences";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";

// Keep the splash up until the saved location and settings are read, so the
// first frame already shows the reader's city and theme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const hydrated = useStoresHydrated();
  const theme = usePreferences((state) => state.theme);
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(theme);
  }, [setColorScheme, theme]);

  useEffect(() => {
    if (hydrated) SplashScreen.hide();
  }, [hydrated]);

  if (!hydrated) return null;

  const scheme = colorScheme === "dark" ? "dark" : "light";

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={NAV_THEME[scheme]}>
        <StatusBar style={scheme === "dark" ? "light" : "dark"} />
        <Stack screenOptions={{ headerShadowVisible: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="location"
            options={{ presentation: "modal", title: "Pilih lokasi" }}
          />
          <Stack.Screen name="settings" options={{ title: "Pengaturan" }} />
          <Stack.Screen
            name="quran/[number]/tafsir"
            options={{ presentation: "modal", title: "Tafsir" }}
          />
        </Stack>
        <AdzanSync />
        <PortalHost />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

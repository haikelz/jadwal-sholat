import type { ConfigContext, ExpoConfig } from "expo/config";

// `APP_VARIANT=development` (set by the EAS development profile) installs
// next to the store app instead of replacing it.
const isDev = process.env.APP_VARIANT === "development";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: isDev ? "Jadwal Sholat (Dev)" : "Jadwal Sholat",
  slug: "jadwal-sholat",
  owner: "haikelz",
  version: "1.0.0",
  scheme: "jadwalsholat",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  android: {
    package: isDev ? "dev.ekel.jdwshlt.dev" : "dev.ekel.jdwshlt",
    adaptiveIcon: {
      backgroundColor: "#ffffff",
      foregroundImage: "./assets/android-icon-foreground.png",
      backgroundImage: "./assets/android-icon-background.png",
      monochromeImage: "./assets/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
    // Prayer times don't change within a few km, so approximate location is enough.
    blockedPermissions: ["android.permission.ACCESS_FINE_LOCATION"],
    // Adzan alarms ring at the exact prayer time (Android 12+ asks the user).
    permissions: ["android.permission.SCHEDULE_EXACT_ALARM"],
  },
  plugins: [
    "expo-router",
    [
      "expo-build-properties",
      {
        android: {
          // Android 9 (API 28) and newer.
          minSdkVersion: 28,
          // Phones only: 64-bit ARM, plus 32-bit ARM for low-end Android 9–10
          // (Go edition) phones. Skipping the x86 emulator and Chromebook
          // builds halves the APK.
          buildArchs: ["arm64-v8a", "armeabi-v7a"],
        },
      },
    ],
    "expo-location",
    "expo-background-task",
    [
      "expo-audio",
      {
        enableBackgroundPlayback: true,
        microphonePermission: false,
        recordAudioAndroid: false,
      },
    ],
    [
      "expo-notifications",
      {
        color: "#171717",
        // Status bar icons must be white on transparent; the launcher icon
        // would show as a solid square. Placeholder until the real app icon.
        icon: "./assets/android-icon-monochrome.png",
        // Android raw resource names can't contain hyphens.
        sounds: ["./assets/sounds/adzan.mp3", "./assets/sounds/adzan_subuh.mp3"],
      },
    ],
    [
      "expo-splash-screen",
      {
        backgroundColor: "#ffffff",
        dark: { backgroundColor: "#0a0a0a" },
        image: "./assets/splash-icon.png",
        imageWidth: 160,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: { projectId: "dd03b4ff-44be-448b-bca7-4a773c65d5d3" },
  },
});

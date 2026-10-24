# Design

Design system: React Native Reusables on NativeWind v4, with the web's ReUI neutral tokens. The all-ages profile in `apps/web/DESIGN.md` applies here too; this file records only what differs on Android.

## Token source

`src/global.css` (classes) and `src/lib/theme.ts` (navigation, icons, status bar), in HSL and hex because React Native can't parse oklch. They mirror `apps/web/src/styles/global.css`; change all three together.

## Android specifics

- **Text size:** follows Android's own font size setting, since `Text` scales with it by default. Never set `allowFontScaling={false}`.
- **Arabic size:** set in Settings ("Ukuran huruf Arab": 1×, 1.25×, 1.5×). `ArabicText` multiplies its `size` by it and keeps the line height at twice the result.
- **Touch targets:** buttons are at least 40dp (React Native Reusables' default size). The icon-only settings gear adds `hitSlop` to reach 48dp.
- **Labels:** every action shows an icon plus a word, and its accessible name contains that word.
- **Audio:** the surah screen pins one labeled audio bar under the list while an ayah is queued.
- **Toasts:** `ToastAndroid.LONG`.

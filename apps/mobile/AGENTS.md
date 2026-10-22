# Android app (`apps/mobile`)

Expo SDK 58 app with the same sections as the web: Jadwal, Qur'an, Hadith, Asma'ul Husna and Puasa Sunnah, plus adzan alarms.

## Project rules

- Shared logic lives in `packages/core` (schemas, API client, prayer times, adzan schedule, dates, share links, bundled data). Add framework-free code there, not here; core must never import React, React Query or zustand.
- UI: NativeWind v4 (Tailwind CSS v3 config in `tailwind.config.js`) with React Native Reusables in `src/components/ui`. Add components with `bunx @react-native-reusables/cli@latest add <name>` from this folder. Don't restyle them (radius, height, padding, shadow); use their `variant` and `size` props.
- Theme tokens in `src/global.css` and `src/lib/theme.ts` mirror the web's `apps/jadwal-sholat/src/app/globals.css` in HSL/hex, because React Native can't parse oklch. Change all three together.
- Persisted state uses zustand `persist` with AsyncStorage (`src/store/*`). The splash screen stays up until every store hydrates (`src/store/hydration.ts`).
- Fetch through `api` from `src/lib/api.ts` with React Query and the shared `queryKeys` from core.
- Every data region has a skeleton, an empty state with one action and an inline error with retry (`src/components/common/state-views.tsx`).
- Arabic text uses `ArabicText` (right to left, line height twice the font size).
- Copy is Indonesian, in sentence case. Every control has an accessible name.
- Native code compiles on EAS only (`bun run build:android`, or `bunx eas-cli build --profile development`). Don't run Gradle or `expo run:android` locally: the laptop runs out of memory.
- `eas.json` pins EAS to the Bun version that wrote `bun.lock` (`base` profile); bump it with your local Bun.
- Bun's isolated install only links a package where its declarer can see it. Anything Babel or Metro must find from other packages' files has to be a direct dependency here (that's why `react-native-css-interop` is listed), and `babel.config.js` loads NativeWind's plugin by absolute require instead of `nativewind/babel`.
- Expo Go previews the app, but it can't use the bundled adzan sounds or background tasks; test alarms on a development build.

This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

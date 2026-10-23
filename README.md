<div align="center">
  <h1>Jadwal Sholat</h1>
  <p>A mobile-friendly Islamic companion for prayer times, Al-Qur'an, hadith, Asmaul Husna, and sunnah fasting schedules.</p>
  <p><a href="https://jdwshlt.ekel.dev">Open the website</a></p>
</div>

## Features

- The current prayer period, the next prayer with a live countdown, today's times, the Hijri date, shortcuts to continue reading and the next sunnah fast, and the days around today with the full month one tap away, based on the reader's remembered location
- Optional adzan reminders through browser notifications, and the last loaded schedule when offline
- Al-Qur'an with reciter selection, audio, transliteration, translation, tafsir, a sticky reading toolbar, jump-to-ayah, Makkiyyah/Madaniyyah filtering, and a "continue reading" shortcut
- Share a surah, a single ayah or a hadith to WhatsApp, Telegram, X, Facebook, Threads, LinkedIn or email, or copy the link; phones open the system share sheet
- Hadith browsing by book and number
- The 99 names of Allah with Arabic text, meaning, and one-tap copy
- Sunnah fasting schedules by month and fasting type, with the next fast highlighted and a month calendar on desktop, powered by the [Puasa Sunnah API](https://puasasunnah.ekel.dev/swagger/index.html)
- Light and dark themes with responsive desktop and mobile navigation
- Desktop layouts that use the width: surah, hadith and Asma'ul Husna lists flow into columns, and `/` jumps to search
- Keyboard-friendly controls, accessible dialogs, reduced-motion support, and zoom-safe layouts
- Canonical metadata, Open Graph and Twitter cards, `robots.txt`, and XML sitemap

## Technology

- Next.js App Router
- TypeScript
- Tailwind CSS v4 + shadcn/ui (`radix-nova` style) + [ReUI](https://reui.io) (Frame, Badge, Alert, Data Grid)
- TanStack Query and TanStack Table
- Zustand
- Sentry
- Expo (React Native), Expo Router, NativeWind and [React Native Reusables](https://reactnativereusables.com) for the Android app
- [moonrepo](https://moonrepo.dev/) monorepo tooling
- Bun

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (lockfile: `bun.lock`)
- [moon](https://moonrepo.dev/) (also available as `@moonrepo/cli` in the workspace root)

### Repository branches

- `master` — production
- `dev` — feature development
- `pagesDir` — historical branch before App Router migration

### Install and run

```bash
git clone https://github.com/haikelz/jadwal-sholat.git
cd jadwal-sholat
bun install
```

Copy the environment template and provide the API endpoints and optional Sentry values:

```bash
cp apps/jadwal-sholat/.env.example apps/jadwal-sholat/.env
```

Start the Next.js app (from the repository root):

```bash
bun run dev:web
```

Equivalent with moon:

```bash
moon run jadwal-sholat:dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other useful commands (root)

| Command | Description |
| --- | --- |
| `bun run dev:web` | Development server |
| `bun run build:web` | Production build |
| `bun run test:web` | E2E tests (Cypress via moon) |
| `bun run test:core` | Unit tests for `packages/core` |
| `bun run dev:mobile` | Metro for the Android app (Expo Go or a development build) |
| `bun run build:android` | Preview APK on EAS |

Type-check the application directly:

```bash
cd apps/jadwal-sholat
bunx tsc --noEmit
```

### App package (`apps/jadwal-sholat`)

You can also run scripts from the app directory:

```bash
cd apps/jadwal-sholat
bun run dev      # next dev
bun run build    # next build
bun run start    # next start
bun run lint     # eslint . (flat config in eslint.config.mjs)
bun run test     # cypress run
bun run open     # cypress open
```

### Android app (`apps/mobile`)

The Android app is an Expo project with the same five sections as the website, plus adzan alarms that ring at the prayer time while the app is closed.

Preview it in [Expo Go](https://expo.dev/go) on a phone on the same network:

```bash
bun run dev:mobile
```

Scan the QR code with Expo Go. Expo Go can't play the adzan as a notification sound or run background tasks; use a development build for those:

```bash
cd apps/mobile
bunx eas-cli login
bunx eas-cli build --platform android --profile development
```

`bun run build:android` builds an installable preview APK on EAS. Native code compiles on EAS only, so no Android Studio or local Gradle is needed.

### Astro website (`apps/web`)

`apps/web` is the Astro + React rewrite of the website, built as static files for Cloudflare Pages. The Next app keeps serving the site until the switch.

```bash
bun run dev:astro     # http://localhost:4321
bun run build:astro   # static output in apps/web/dist
```

Cloudflare Pages project settings (Git integration):

| Setting | Value |
| --- | --- |
| Root directory | `apps/web` |
| Build command | `cd ../.. && bun install --frozen-lockfile && cd apps/web && bun run build` |
| Build output directory | `dist` |
| Environment variables | `SKIP_DEPENDENCY_INSTALL=1` (the build command installs the Bun workspace), `BUN_VERSION=1.3.11`, `NODE_VERSION=24` (Astro 7 needs Node 22.23.4 or later) |
| Optional | `PUBLIC_SENTRY_DSN` to report browser errors; `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` to upload source maps |
| Build watch paths | `apps/web/*`, `packages/core/*`, `bun.lock` |

Pages picks up `apps/web/functions` (the puasa API proxy), `public/_redirects` and `public/_headers` automatically. Turn on Web Analytics under the project's Metrics tab; Cloudflare adds the script itself.

### Workspace layout

- `apps/jadwal-sholat` — Next.js application
  - `src/components/ui` — shadcn/ui primitives installed with the shadcn CLI
  - `src/components/reui` — ReUI components (Frame, Badge, Alert, Data Grid)
- `apps/web` — Astro + React rewrite of the website, for Cloudflare Pages
- `apps/mobile` — Android app (Expo Router, NativeWind, React Native Reusables)
- `packages/core` — framework-free code shared by both apps: API schemas and clients, prayer times, the adzan schedule, dates, share links, and the bundled surah list and Asma'ul Husna
- `packages/eslint-config`, `packages/typescript-config` — shared tooling
- `static/docs` — documentation screenshots
- `AGENTS.md` — contributor and coding-agent guidance

## Screenshots

### Desktop

| Prayer schedule | Sunnah fasting | Al-Qur'an library |
| :---: | :---: | :---: |
| ![Prayer schedule on desktop](/static/docs/docs-screenshots.cy.ts/desktop-prayer-schedule.png) | ![Sunnah fasting schedule on desktop](/static/docs/docs-screenshots.cy.ts/desktop-sunnah-fasting.png) | ![Al-Qur'an library on desktop](/static/docs/docs-screenshots.cy.ts/desktop-quran-library.png) |

### Mobile

| Prayer schedule | Sunnah fasting | Al-Qur'an reading |
| :---: | :---: | :---: |
| ![Prayer schedule on mobile](/static/docs/docs-screenshots.cy.ts/mobile-prayer-schedule.png) | ![Sunnah fasting schedule on mobile](/static/docs/docs-screenshots.cy.ts/mobile-sunnah-fasting.png) | ![Al-Qur'an reading on mobile](/static/docs/docs-screenshots.cy.ts/mobile-quran-reading.png) |

The screenshots were captured from a production build at `1440×900` for desktop and `390×844` for mobile.

## Design system

The interface follows ReUI on top of shadcn/ui. Pages use a shared `PageShell`; list pages use a left-aligned `PageHeader`, and surah pages use a centered, mushaf-style header. The homepage leads with the next prayer in plain type and keeps a ReUI `Frame` only around the month data grid; the sunnah fasting page uses a `Frame` and the data grid. Reading pages (Al-Qur'an, hadith, Asma'ul Husna) use a centered reading column with plain divided rows instead of panels. Desktop navigation is a top bar; on phones it is a bottom tab bar. Colors come from semantic theme tokens (shadcn neutral plus ReUI's success, info, and warning tokens) and work in light and dark mode. Every data region has its own loading skeleton, empty state, and error state with a retry action.

The interface is tuned for readers of every age (`apps/jadwal-sholat/DESIGN.md`): body text renders at about 16px, the "Tampilan" dialog in the top bar sets the theme, text size and Arabic size, every action shows a word next to its icon, and touch targets reach 44px. The surah page keeps one audio bar with large controls while recitation plays.

## Performance

- Surah and hadith detail pages fetch their content on the server, so the text arrives in the HTML. Surah pages render on their first visit and stay cached for a day instead of being prerendered during the build.
- The Qur'an list page receives only the fields it renders, not the full surah payload.
- The homepage loads the monthly data grid lazily, after today's schedule.
- Application code reads API URLs from `src/lib/utils/public-env.ts`. `src/env.mjs` still validates them with zod when `next.config.mjs` loads, which keeps zod out of the browser bundle.
- The page entrance animation is plain CSS, so no animation library ships to the browser.
- Data requests use the native `fetch` API (no axios), and TanStack Query keeps fetched data fresh for an hour, so returning to a page does not refetch it.
- The homepage waits for the reader's location (remembered between visits) before fetching, so the month schedule loads once instead of once for the default city and again for the real location.

## Accessibility and SEO

The shared interface uses one main landmark, a skip link, visible focus indicators, labeled search fields, focus-managed Radix dialogs, responsive typography, and reduced-motion fallbacks. Arabic text uses the local LPMQ font in WOFF2 format.

Metadata is centralized in `src/lib/utils/metadata.ts`. Public routes include unique descriptions, canonical URLs, Open Graph data, and Twitter cards. Next.js generates `/robots.txt` and `/sitemap.xml` from `robots.ts` and `sitemap.ts`.

## Activity

![Alt](https://repobeats.axiom.co/api/embed/fdae03fe11b3e4d1ef0dec27555d7eb2b121bd5f.svg "Repobeats analytics image")

## Credits

Thank you for inspiring me

https://islamiah.vercel.app/

## Support

- [Github Sponsor](https://github.com/sponsors/haikelz)
- [Trakteer](https://trakteer.id/haikelz/tip)

## License

MIT

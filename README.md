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

- [Astro](https://astro.build) 7 with React islands, built as static files for Cloudflare Pages
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
- [Node.js](https://nodejs.org/) 22.23.4 or later (Astro 7)
- [moon](https://moonrepo.dev/) (also available as `@moonrepo/cli` in the workspace root)

### Repository branches

- `master` — production
- `dev` — feature development
- `pagesDir` — historical branch from the Next.js Pages Router era

### Install and run

```bash
git clone https://github.com/haikelz/jadwal-sholat.git
cd jadwal-sholat
bun install
cp apps/web/.env.example apps/web/.env   # then fill in the API URLs
bun run dev:web
```

Open [http://localhost:4321](http://localhost:4321). `apps/web/.env` holds the public API base URLs, which `astro:env` checks when the dev server or build starts (the schema is in `apps/web/astro.config.mjs`), plus the optional Sentry values.

### Useful commands (root)

| Command | Description |
| --- | --- |
| `bun run dev:web` | Website dev server |
| `bun run build:web` | Static website build in `apps/web/dist` |
| `bun run test:web` | Cypress E2E tests against `bun run preview` in `apps/web` |
| `bun run test:core` | Unit tests for `packages/core` |
| `bun run dev:mobile` | Metro for the Android app (Expo Go or a development build) |
| `bun run build:android` | Preview APK on EAS |

### Website (`apps/web`)

```bash
cd apps/web
bun run dev       # astro dev
bun run check     # astro check (types)
bun run build     # astro build
bun run preview   # serve the build on http://localhost:4321
bun run test      # cypress run, with the preview running
```

`astro dev` and `astro preview` don't apply Cloudflare's `_redirects` or Functions, so hadith detail pages and the puasa schedule only work under `bunx wrangler pages dev dist` (after a build) or on Pages itself.

Cloudflare Pages project settings (Git integration):

| Setting | Value |
| --- | --- |
| Root directory | `apps/web` |
| Build command | `cd ../.. && bun install --frozen-lockfile && cd apps/web && bun run build` |
| Build output directory | `dist` |
| Environment variables | `SKIP_DEPENDENCY_INSTALL=1` (the build command installs the Bun workspace), `BUN_VERSION=1.3.11`, `NODE_VERSION=24` (Astro 7 needs Node 22.23.4 or later) |
| Required variables | The API base URLs from `apps/web/.env.example`: `ASMAUL_HUSNA_API`, `HADITH_API`, `JADWAL_SHOLAT_API`, `NOMINATIM_API`, `QURAN_API` (read during the build) and `PUASA_SUNNAH_API` (read by the puasa proxy) |
| Optional | `PUBLIC_SENTRY_DSN` to report browser errors; `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` to upload source maps |
| Build watch paths | `apps/web/*`, `packages/core/*`, `bun.lock` |

Pages picks up `apps/web/functions` (the puasa API proxy), `public/_redirects` and `public/_headers` automatically. Turn on Web Analytics under the project's Metrics tab; Cloudflare adds the script itself.

### Android app (`apps/mobile`)

The Android app is an Expo project with the same five sections as the website, plus adzan alarms that ring at the prayer time while the app is closed.

Copy `apps/mobile/.env.example` to `apps/mobile/.env` and fill in the API URLs. EAS doesn't upload `.env`, so give EAS builds the same `EXPO_PUBLIC_*` variables once (from `apps/mobile`): `bunx eas-cli env:push --environment development --environment preview --environment production --path .env`. An EAS build stops if one is missing.

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

### Workspace layout

- `apps/web` — the website (Astro + React islands, Cloudflare Pages)
  - `src/pages` — routes, plus `robots.txt` and the sitemaps
  - `src/components/islands` — the React roots each page hydrates
  - `src/components/ui` — shadcn/ui primitives installed with the shadcn CLI
  - `src/components/reui` — ReUI components (Frame, Badge, Alert, Data Grid)
  - `functions` — the Cloudflare Pages Function that proxies the puasa API
- `apps/mobile` — Android app (Expo Router, NativeWind, React Native Reusables)
- `packages/core` — framework-free code shared by both apps: API schemas and clients, prayer times, the adzan schedule, dates, share links, and the bundled surah list and Asma'ul Husna
- `packages/typescript-config` — shared TypeScript configs
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

The interface is tuned for readers of every age (`apps/web/DESIGN.md`): body text renders at about 16px, the "Tampilan" dialog in the top bar sets the theme, text size and Arabic size, every action shows a word next to its icon, and touch targets reach 44px. The surah page keeps one audio bar with large controls while recitation plays.

## Performance

- Every page is a static file served from Cloudflare's edge. Only the interactive parts (React islands) load JavaScript; the top bar and tab bar are plain HTML.
- The 114 surah pages are built ahead of time with only the fields the reader renders, so the Arabic text and translation arrive in the HTML.
- The surah list and Asma'ul Husna come from data bundled in `packages/core`, so those pages need no API call.
- The homepage loads the map, adzan player and monthly data grid after the page starts, and waits for the reader's location (remembered between visits) before fetching, so the month schedule loads once.
- Astro's client router keeps the page's JavaScript alive between pages, so the TanStack Query cache, the theme and a recitation carry over; fetched data stays fresh for an hour.
- A small service worker keeps visited pages and prayer times available offline, and hashed bundles are cached for a year.
- The page entrance animation is plain CSS, so no animation library ships to the browser.

## Accessibility and SEO

The shared interface uses one main landmark, a skip link, visible focus indicators, labeled search fields, focus-managed Radix dialogs, responsive typography, and reduced-motion fallbacks. Arabic text uses the local LPMQ font in WOFF2 format.

`BaseLayout` writes each page's title, description, canonical URL, Open Graph and Twitter tags, and JSON-LD (`WebSite` plus a breadcrumb). `robots.txt`, `sitemap.xml` (static pages and the 114 surahs) and `sitemap-hadith.xml` (every hadith) are built from `src/pages`.

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

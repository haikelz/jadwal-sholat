<div align="center">
  <h1>Jadwal Sholat</h1>
  <p>A mobile-friendly Islamic companion for prayer times, Al-Qur'an, hadith, Asmaul Husna, and sunnah fasting schedules.</p>
  <p><a href="https://jdwshlt.ekel.dev">Open the website</a></p>
</div>

## Features

- Today's prayer times and a switchable monthly schedule based on the reader's location
- Al-Qur'an with reciter selection, audio, transliteration, translation, tafsir, and last-read bookmarks
- Hadith browsing by book and number
- The 99 names of Allah with Arabic text and meaning
- Sunnah fasting schedules by month and fasting type, powered by the [Puasa Sunnah API](https://puasasunnah.ekel.dev/swagger/index.html)
- Light and dark themes with responsive desktop and mobile navigation
- Keyboard-friendly controls, accessible dialogs, reduced-motion support, and zoom-safe layouts
- Canonical metadata, Open Graph and Twitter cards, `robots.txt`, and XML sitemap

## Technology

- Next.js App Router
- TypeScript
- Tailwind CSS v4 + shadcn/ui + Radix UI
- TanStack Query
- Zustand
- Sentry
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
bun run lint     # next lint
bun run test     # cypress run
bun run open     # cypress open
```

### Workspace layout

- `apps/jadwal-sholat` — Next.js application
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

## Accessibility and SEO

The shared interface uses one main landmark, a skip link, visible focus indicators, labeled search fields, native controls, focus-managed Radix dialogs, responsive typography, and reduced-motion fallbacks. Arabic text uses the local LPMQ font in WOFF2 format.

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

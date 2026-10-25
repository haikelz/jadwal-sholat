# Repository guide

## Project structure

- `apps/web` is the website: Astro 7 with React islands, built as static files for Cloudflare Pages. See `apps/web/AGENTS.md`.
- `apps/mobile` is the Android app (Expo SDK 58, Expo Router, NativeWind v4 + React Native Reusables). See `apps/mobile/AGENTS.md`.
- `packages/core` holds framework-free domain code shared by the website and the Android app: API schemas and URL builders, prayer logic, the adzan schedule, dates, share links, Qur'an and puasa helpers, and bundled static data. It must never import React, React Query or zustand.
- Both apps pin the same `react`, `react-dom`, `@types/react` and `@types/react-dom`: the versions the Expo SDK in `apps/mobile` requires. A fresh install (Cloudflare Pages, EAS) hoists one copy per package for the whole workspace, so two versions mix type definitions and can load two Reacts. Bump them together.
- `packages/typescript-config` contains the shared TypeScript configs.
- `static/docs` contains README screenshots.
- Run workspace commands from the repository root unless a command says otherwise.

## Commands

- Install dependencies: `bun install`
- Website: `bun run dev:web` (http://localhost:4321), `bun run build:web` (static output in `apps/web/dist`), `bun run test:web` (Cypress against `bun run preview` running in `apps/web`), type-check with `cd apps/web && bun run check`.
- Core tests and types: `bun run test:core`, `bun run typecheck:core`
- Android app: `bun run dev:mobile` (Metro for Expo Go or a development build), `bun run typecheck:mobile`, `bun run build:android` (preview APK on EAS). Native code compiles on EAS only; don't run Gradle or `expo run:android` locally.

The website build fetches the 114 surahs and the hadith book list from the public APIs, so it needs network access. Builds are memory-heavy: stop dev servers before building, and run one build at a time.

## Implementation conventions (website)

- Use TypeScript, Astro pages with React islands, Tailwind CSS v4, shadcn/ui (`radix-nova` style), and ReUI.
- Prefer shared components in `src/components/ui` (shadcn) and `src/components/reui` (ReUI) over custom interactive elements. Tables use the ReUI data grid, modals use `Dialog`, toasts use `sonner`.
- Install components from `apps/web` with `bunx --bun shadcn@latest add <name> --yes` (ReUI items as `@reui/<name>`). The CLI writes `import { cn } from "cn"` and adds a `cn` package: change the imports to `@/lib/utils/cn` and run `bun remove cn`.
- Do not restyle installed components (radius, height, padding, shadow); use their `size` and `variant` props, and change the look through the theme tokens in `src/styles/global.css`.
- Every page renders `BaseLayout` (`src/layouts/BaseLayout.astro`); its content uses `PageShell` and `PageHeader` from `src/components/common/page-shell.tsx`. The site is a companion app, not a dashboard, so it uses two layouts:
  - Glance pages (homepage schedule, Puasa Sunnah): `<PageShell>`. The homepage leads with the next prayer as plain type and keeps a `Frame` only around the month data grid; Puasa Sunnah keeps its `Frame` and data grid.
  - Reading pages (Qur'an, hadith, Asma'ul Husna): no frames around content; separate items with plain bordered rows and generous spacing. List pages use the default site width and flow their rows into columns from `md` up (`grid md:grid-cols-2`, `lg:grid-cols-3` for short rows like surahs); in a grid give each row `border-b` and the list `border-t`, because `divide-y` breaks across columns; detail pages (a surah, a hadith) use `<PageShell width="reading">`, a centered 768px column with a centered header (`PageHeader align="center"` or the surah's mushaf-style header).
- Widths: the top bar and every `PageShell` share one site width (`max-w-5xl`), so page edges line up; only detail pages narrow to the reading column. Don't add page-level `max-w-*` elsewhere.
- Navigation is a top bar with the five sections from `md` up and a bottom tab bar below `md` (`src/components/layout`); there is no sidebar and there are no breadcrumbs. On phones, detail pages show a back link in the top bar. `PageShell` reserves `pb-24` for the bar on mobile.
- Design for desktop as well as phones: use the width for columns or a richer view (the Puasa Sunnah month calendar) instead of stretching phone rows. `SearchBar` focuses on `/` and shows the hint from `md` up.
- Share detail content with `ShareButton` from `src/components/common/share-button.tsx` (links built by `getShareLinks` in `src/lib/helpers/share-links.ts`, absolute URLs from `SITE_URL`). Ayah links use the `#ayat-N` anchors.
- Give every data region a `Skeleton` loading state, an `Empty` state with one action, and an inline `Alert` error with a retry.
- Fetch with `getData` from `src/lib/utils/get-data.ts` (native `fetch`); in islands use `useFetch`, which accepts build-time `initialData` and skips the request while its URL is `""`.
- Read the current time with the `useNow()` hook and format it with `getDateParts()` from `src/lib/utils/date-parts.ts`. Never compute dates at module level or during the build: static pages would bake in the build date, and open tabs go stale after midnight.
- Read API URLs from `src/lib/utils/public-env.ts`. The browser calls the APIs directly, except puasa, which goes through the `/api/sunnah-fasting` proxy in `public/_worker.js`.
- Pass only the fields an island renders: island props are serialized into the page's HTML (the surah page trims the API response).
- Keep mobile styles as the default; add larger-screen behavior with responsive variants.
- Preserve one `<main>` landmark, a logical heading hierarchy, visible focus states, keyboard behavior, and accessible names for every control.
- Keep mobile form text at `text-base`; use `sm:text-sm` only above the mobile breakpoint.
- Use `arabic-font` and `lang="ar"` for Arabic source text. The LPMQ font is defined in `src/styles/global.css` and served from `public/fonts`. Size Arabic text with `[--arabic-size:<rem>]`, never a `text-*` class, so the reader's Arabic size setting applies.
- Follow the all-ages profile in `apps/web/DESIGN.md`: the root text scale (body `text-sm` renders at about 16px), a visible word beside every icon in a button, default-size actions, and plain words beside jargon.
- Respect `prefers-reduced-motion`; do not add unconditional motion or smooth scrolling. Use CSS (`tw-animate-css` utilities) for motion rather than an animation library.
- Write interface copy in clear Indonesian and use sentence case.

## SEO

- Pass every page's `title`, `description` and `path` to `BaseLayout`, which writes the title, canonical, Open Graph and Twitter tags through `pageMeta` in `src/lib/utils/metadata.ts`. Write titles and descriptions in Indonesian around what people search for ("Surat Al-Kahf (الكهف): Arab, Latin dan Artinya"); cut API text with `toDescription`, which stops at a word boundary. The homepage passes `absoluteTitle`; other titles get the " | Jadwal Sholat" suffix, including on social cards.
- Give every indexable page a `BreadcrumbList` through `BaseLayout`'s `jsonLd={[breadcrumbJsonLd([...])]}`. The layout always adds the `WebSite` schema.
- The site is static: only built routes exist, and anything else gets `src/pages/404.astro`. Hadith pages are one shell (`/hadith-detail`): for each `/hadith/<book>/<n>` request, `public/_worker.js` writes the hadith's title, description, canonical and breadcrumb into it (and answers 404 for a missing hadith), and the page sets the same values once the hadith loads. Keep the two in step.
- Every indexable route needs a unique title, description, canonical path, Open Graph URL, and Twitter card data.
- Keep `robots.txt.ts` and the sitemaps aligned with public routes: `sitemap.xml.ts` (static pages and the 114 surahs) and `sitemap-hadith.xml.ts` (every hadith, because hadith pages render in the browser). `robots.txt.ts` lists both and disallows `/api/` and `/hadith-detail`.
- Reuse the shared social image unless a route has a deliberate, production-ready replacement.

## Documentation screenshots

- Capture both desktop (`1440×900`) and mobile (`390×844`) states.
- Use the built site (`bun run preview` in `apps/web`) so the Astro dev toolbar doesn't appear.
- Update the screenshot links in `README.md` whenever files under `static/docs` change.

## Verification

Run the narrowest relevant check first. For shared UI, metadata, or routing changes, run:

```bash
cd apps/web
bun run check
bun run build
bun run preview   # then, in another terminal: bun run test
```

Hadith detail pages and the puasa proxy need Cloudflare's `_redirects` and `_worker.js`: check them with `bunx wrangler pages dev dist`. Also inspect the changed flow at `390px` and `1440px`, including keyboard focus, dialogs, dark mode, and horizontal overflow.

<!-- graft:start -->
## Graft — repo context graph

This repo is indexed in `graft/`: small linked markdown nodes that explain each
system and carry exact file:line spans, kept in sync with the code through git.

For ANY task here — understanding how something works, finding where code lives,
or scoping a change — get context from the graph before grepping or opening
source files. Re-ask freely (it's cheap) and reuse literal identifiers you
already have (symbol, error string, file name) as the query. New to this repo?
Run `graft map` first — a token-budgeted orientation (dir clusters, hubs,
hotspots), no LLM, no key.

- Run `graft ask "<your question>" --source` → ranked nodes with the relevant
  code spans inlined (each hit's ≤8-line crux by default; `--full` for whole
  definitions when the crux isn't enough). Match the tool to the task shape:
  for understanding or editing, the top node IS the answer — cite its
  `covers:` file:line spans and edit straight from `--source`. For
  exhaustive tasks ("every occurrence / every caller of this pattern"), ranked
  results are top-N, not complete — run `graft grep "<literal>"` instead
  (exhaustive over indexed files, grouped by enclosing symbol), falling back
  to raw `grep -rn` only for unindexed files.
- `graft skeleton <file>` → every definition's signature + span, ~10× cheaper
  than reading the file; use it to skim an API surface.
- `graft callers <symbol>` gives precomputed, exact edges — who calls this.
  Add `--direction out` for what it calls, or `--depth N` to walk
  transitively for the full blast radius. For structural questions, skip
  ranking and use this directly.
- Or browse: `graft/INDEX.md` lists every node; follow the links.
- Monorepos and folders of multiple repos rank fairly across sub-projects —
  hits carry `[scope/]` labels naming which one they're from. Narrow with
  `graft ask "<task>" --in <scope>/` once you know where you're working.

If a returned span is truncated ("+N more lines"), open the file at that exact
range before finalizing. Only open source files when a node genuinely lacks a
needed detail, and then at the exact file:line the node points to — never
re-read whole files.

After big code changes, refresh the graph with `graft build` (deterministic,
no API key, $0).
<!-- graft:end -->

<!-- AI-GUIDELINES:BEGIN -->
## AI Engineering Guidelines

Read `.agents/general.md` and `.agents/preferences.md` for every task. Then select the smallest matching context profile below. Do not read every installed companion by default. Precedence follows `.agents/general.md` §2: repository-local instructions win, then the `haikel-*` owner profile, then the other guidelines.

**Tutor mode is on.** Read `.agents/guidelines/tutor.md` before every task. It decides who writes the code and overrides the change-work rules in `.agents/general.md` §3; the other guidelines still decide what good code looks like.

- **Repository setup, documentation, planning, CI, or process:** `.agents/harness.md`.
- **JavaScript or TypeScript language/library work:** `.agents/guidelines/javascript-typescript.md` and `.agents/guidelines/haikel-javascript-typescript.md`.
- **Next.js UI or application work:** `.agents/guidelines/javascript-typescript.md`, `.agents/guidelines/haikel-javascript-typescript.md`, and `.agents/guidelines/nextjs.md`.
- **Container, Compose, delivery, or runtime work:** `.agents/guidelines/docker.md`; add an application profile only when its build or runtime behavior also changes.
- **UI, styling, theming, or design-system work:** `.agents/guidelines/design-system.md`; its §1 decides whether ReUI applies (from-scratch projects where the owner mentions it) or the existing system stays (handover projects). Add the framework profile only when its code also changes.
- **Cross-cutting work:** use the union of only the affected profiles and state why each additional document is needed.

### Workspace scopes

Match the changed path first, then use only that workspace's applicable profile.

- `.moon/cache/schemas/**`: javascript-typescript.
- `packages/core/**`: javascript-typescript.
- `packages/typescript-config/**`: javascript-typescript.
- `apps/mobile/**`: javascript-typescript, design-system.
- `apps/web/**`: javascript-typescript, design-system.
<!-- AI-GUIDELINES:END -->

# Repository guide

## Project structure

- `apps/jadwal-sholat` is the Next.js App Router application.
- `packages/eslint-config` and `packages/typescript-config` contain shared tooling.
- `static/docs` contains README screenshots.
- Run workspace commands from the repository root unless a command says otherwise.

## Commands

- Install dependencies: `bun install`
- Start the web app: `bun run dev:web`
- Type-check: `cd apps/jadwal-sholat && bunx tsc --noEmit`
- Production build: `bun run build:web`
- Cypress E2E tests: `bun run test:web`

The production build prerenders API-backed routes and therefore requires valid values from `apps/jadwal-sholat/.env` plus network access to those APIs.

Builds are memory-heavy. Stop `bun run dev:web` and any other `next build` or `next start` before building, and run one build at a time.

## Implementation conventions

- Use TypeScript, React Server/Client Components, Tailwind CSS v4, shadcn/ui (`radix-nova` style), and ReUI.
- Prefer shared components in `src/components/ui` (shadcn) and `src/components/reui` (ReUI) over custom interactive elements. Tables use the ReUI data grid, modals use `Dialog`, toasts use `sonner`.
- Install components from `apps/jadwal-sholat` with `bunx --bun shadcn@latest add <name> --yes` (ReUI items as `@reui/<name>`). The CLI writes `import { cn } from "cn"` and adds a `cn` package: change the imports to `@/lib/utils/cn` and run `bun remove cn`.
- Do not restyle installed components (radius, height, padding, shadow); use their `size` and `variant` props, and change the look through the theme tokens in `globals.css`.
- Build pages with `PageShell` and `PageHeader` from `src/components/common/page-shell.tsx` and put content in ReUI `Frame` panels. Give every data region a `Skeleton` loading state, an `Empty` state with one action, and an inline `Alert` error with a retry.
- Read API URLs from `src/lib/utils/public-env.ts` in application code. Only `next.config.mjs` imports `src/env.mjs`, so zod stays out of the browser bundle.
- Pass only the fields a client component renders, and keep `generateStaticParams` light: surah pages render on first visit (`revalidate`) instead of all 114 at build time.
- Keep mobile styles as the default; add larger-screen behavior with responsive variants.
- Preserve one `<main>` landmark, a logical heading hierarchy, visible focus states, keyboard behavior, and accessible names for every control.
- Keep mobile form text at `text-base`; use `sm:text-sm` only above the mobile breakpoint.
- Use `arabic-font` and `lang="ar"` for Arabic source text. The font is defined centrally in `src/lib/utils/fonts.ts` and `globals.css`.
- Respect `prefers-reduced-motion`; do not add unconditional motion or smooth scrolling. Use CSS (`tw-animate-css` utilities) for motion rather than an animation library.
- Write interface copy in clear Indonesian and use sentence case.

## SEO

- Build page metadata with `createPageMetadata` from `src/lib/utils/metadata.ts`.
- Every indexable route needs a unique title, description, canonical path, Open Graph URL, and Twitter card data.
- Keep `robots.ts` and `sitemap.ts` aligned with public routes.
- Reuse the shared social image unless a route has a deliberate, production-ready replacement.

## Documentation screenshots

- Capture both desktop (`1440×900`) and mobile (`390×844`) states.
- Use a production server when possible so Next.js development indicators do not appear.
- Update the screenshot links in `README.md` whenever files under `static/docs` change.

## Verification

Run the narrowest relevant check first. For shared UI, metadata, or routing changes, run:

```bash
cd apps/jadwal-sholat
bunx tsc --noEmit
bun run build
bunx cypress run
```

Also inspect the changed flow at `390px` and `1440px`, including keyboard focus, dialogs, dark mode, and horizontal overflow.

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
- **UI, styling, theming, or design-system work:** `.agents/guidelines/design-system.md`; add the framework profile only when its code also changes.
- **Cross-cutting work:** use the union of only the affected profiles and state why each additional document is needed.

### Workspace scopes

Match the changed path first, then use only that workspace's applicable profile.

- `graft/apps/jadwal-sholat/**`: javascript-typescript, nextjs, docker.
- `.moon/cache/schemas/**`: javascript-typescript.
- `packages/eslint-config/**`: javascript-typescript.
- `packages/typescript-config/**`: javascript-typescript.
- `apps/jadwal-sholat/**`: javascript-typescript, nextjs, design-system, docker.
<!-- AI-GUIDELINES:END -->

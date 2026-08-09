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

## Implementation conventions

- Use TypeScript, React Server/Client Components, Tailwind CSS v4, and the existing shadcn/Radix primitives.
- Prefer shared components in `src/components/ui` over custom interactive elements.
- Keep mobile styles as the default; add larger-screen behavior with responsive variants.
- Preserve one `<main>` landmark, a logical heading hierarchy, visible focus states, keyboard behavior, and accessible names for every control.
- Keep mobile form text at `text-base`; use `sm:text-sm` only above the mobile breakpoint.
- Use `arabic-font` and `lang="ar"` for Arabic source text. The font is defined centrally in `src/lib/utils/fonts.ts` and `globals.css`.
- Respect `prefers-reduced-motion`; do not add unconditional motion or smooth scrolling.
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

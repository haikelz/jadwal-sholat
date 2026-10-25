# Website (`apps/web`)

Astro 7 with React islands, built as static files for Cloudflare Pages.

## Project rules

- **Pages** are `.astro` files in `src/pages` that render `BaseLayout` (title, description, path, breadcrumbs as `jsonLd`). Interactive parts are React islands; every island root renders inside `Providers` (`src/components/providers.tsx`), because React context doesn't cross islands. The React Query client and zustand stores are module singletons, so islands share them.
- **Island roots** live in `src/components/islands/` (`<page>-island.tsx`): each wraps the page's React component in `Providers` and is what the `.astro` page hydrates with `client:load`.
- **Islands render to HTML at build.** Touch `window`, `localStorage`, `Audio`, `Notification` or Leaflet only in effects or in lazily loaded children.
- **Navigation** goes through Astro's `<ClientRouter />`: use plain `<a href>` links and `navigate()` from `astro:transitions/client`. Module state (audio, React Query cache, zustand) survives navigation; `<html>` attributes don't, so the `<head>` display script re-applies theme and text sizes after every swap.
- **Static only** (no adapter): there is no request-time rendering. Surah pages are built at build time from the API; hadith detail pages are one shell (`src/pages/hadith-detail.astro`) that `public/_redirects` serves for every `/hadith/<book>/<n>` URL and that loads the hadith in the browser.
- **Local testing of Cloudflare behavior:** `astro dev` doesn't read `_redirects` or `_worker.js`, so hadith detail pages and the puasa proxy 404 there. Build, then run `bunx wrangler pages dev dist` from this folder to serve the output the way Pages does.
- **Cloudflare files:** `public/_redirects` (redirects and the hadith rewrite), `public/_headers` (cache headers), `public/_worker.js` with `public/_routes.json` (proxy for the puasa API, which sends no CORS header; Pages runs it for `/api/*` only, and a `functions/` folder would not deploy unless the Pages root directory is `apps/web`), `public/sw.js` (offline cache).
- **Analytics:** GoatCounter loads only when the optional `GOATCOUNTER_URL` (its `…/count` endpoint) is set; `BaseLayout` counts each `ClientRouter` navigation, since `count.js` only sees the first page.
- **API URLs** come from `.env` through `astro:env` (schema in `astro.config.mjs`, names in `.env.example`) and are read from `src/lib/utils/public-env.ts`; the browser calls the APIs directly, except puasa, which goes through `/api/sunnah-fasting`.
- **UI:** shadcn/ui (`radix-nova`) and ReUI in `src/components/ui` and `src/components/reui`; add components from this folder with `bunx --bun shadcn@latest add <name>`, then change `from "cn"` to `@/lib/utils/cn` and remove the `cn` package. Follow `DESIGN.md` (the all-ages profile).
- **SEO** follows the root AGENTS.md rules: `BaseLayout` writes the title, description, canonical, Open Graph, Twitter and JSON-LD tags; `src/pages/sitemap.xml.ts`, `sitemap-hadith.xml.ts` and `robots.txt.ts` build the crawler files.

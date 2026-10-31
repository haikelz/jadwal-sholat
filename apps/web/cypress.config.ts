import { defineConfig } from "cypress";

// Runs against `bun run preview` (the built static site). Hadith detail
// pages need Cloudflare's _redirects and _worker.js, which only
// `bunx wrangler pages dev dist` serves; the puasa spec answers the
// /api/sunnah-fasting proxy request itself.
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4321",
  },
});

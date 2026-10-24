import { defineConfig } from "cypress";

// Runs against `bun run preview` (the built static site). Hadith detail
// pages and the puasa proxy need Cloudflare's _redirects and Functions,
// which only `bunx wrangler pages dev dist` serves.
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4321",
  },
});

import react from "@astrojs/react";
import sentry from "@sentry/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// Static output for Cloudflare Pages: no adapter. Pages serve /quran/1 from
// quran/1.html, so URLs keep the Next site's no-trailing-slash form.
export default defineConfig({
  site: "https://jdwshlt.ekel.dev",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [
    react(),
    sentry({
      // Source maps upload only when the token is set (CI); the browser SDK
      // reads its DSN in sentry.client.config.ts.
      authToken: process.env.SENTRY_AUTH_TOKEN,
      enabled: { client: true, server: false },
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

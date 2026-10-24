import react from "@astrojs/react";
import sentry from "@sentry/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

// Public API base URLs, read from .env locally and from the Pages build
// variables on Cloudflare. They end up in the browser bundle.
const publicUrl = envField.string({ context: "client", access: "public", url: true });

// Static output for Cloudflare Pages: no adapter. Pages serve /quran/1 from
// quran/1.html, so URLs have no trailing slash.
export default defineConfig({
  site: "https://jdwshlt.ekel.dev",
  trailingSlash: "never",
  build: { format: "file" },
  env: {
    schema: {
      ASMAUL_HUSNA_API: publicUrl,
      HADITH_API: publicUrl,
      JADWAL_SHOLAT_API: publicUrl,
      NOMINATIM_API: publicUrl,
      QURAN_API: publicUrl,
    },
  },
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

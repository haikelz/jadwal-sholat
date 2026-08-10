import withPWAInit from "@ducanh2912/next-pwa";
import { withSentryConfig } from "@sentry/nextjs";

import "./src/env.mjs";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development" ? true : false,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const config = withSentryConfig(
  withPWA({
    reactStrictMode: true,
    compress: true,
    async rewrites() {
      return [
        {
          source: "/api/puasa-sunnah",
          destination: `${process.env.NEXT_PUBLIC_PUASA_SUNNAH_API}/api/id/fasting/schedules`,
        },
      ];
    },
    experimental: {
      optimizePackageImports: ["@radix-ui/*"],
      webpackBuildWorker: true,
      webpackMemoryOptimizations: true,
      preloadEntriesOnStart: true,
      turbopackFileSystemCacheForBuild: true,
      turbopackFileSystemCacheForDev: true,
    },
  }),
  {
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: false,
    widenClientFileUpload: true,
    disableLogger: true,
  },
);

export default config;

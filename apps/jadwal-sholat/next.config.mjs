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
    experimental: {
      webpackBuildWorker: true,
      optimizePackageImports: ["@radix-ui/*"],
    },
  }),
  {
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: false,
    widenClientFileUpload: true,
    disableLogger: true,
  }
);

export default config;

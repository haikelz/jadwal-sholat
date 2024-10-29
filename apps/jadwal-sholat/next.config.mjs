import withPWAInit from "@ducanh2912/next-pwa";

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
const config = withPWA({
  reactStrictMode: true,
  compress: true,
  experimental: {
    webpackBuildWorker: true,
  },
});

export default config;

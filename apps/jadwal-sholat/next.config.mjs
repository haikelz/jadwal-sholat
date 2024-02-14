import withPWAInit from "@ducanh2912/next-pwa";
import UnoCSS from "@unocss/webpack";

import "./src/env.mjs";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development" ? true : false,
});

/** @type {import('next').NextConfig} */
const config = withPWA({
  reactStrictMode: true,
  compress: true,
  webpack: (config) => {
    config.cache = false;
    config.plugins.push(UnoCSS());
    return config;
  },
  experimental: {
    webpackBuildWorker: true,
  },
});

export default config;

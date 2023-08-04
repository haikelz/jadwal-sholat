import withPWAInit from "@ducanh2912/next-pwa";
import WindiCSSWebpackPlugin from "windicss-webpack-plugin";

import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

export default withPWA({
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin());
    return config;
  },
});

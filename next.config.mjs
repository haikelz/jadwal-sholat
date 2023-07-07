import PWA from "next-pwa";
import WindiCSSWebpackPlugin from "windicss-webpack-plugin";
import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const withPWA = PWA({
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

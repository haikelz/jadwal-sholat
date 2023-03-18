/** @type {import('next').NextConfig} */
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin());
    return config;
  },
});

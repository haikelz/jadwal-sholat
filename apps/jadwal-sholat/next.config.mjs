import WindiCSSWebpackPlugin from "windicss-webpack-plugin";

import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin());
    return config;
  },
};

export default config;

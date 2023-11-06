import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    webpackBuildWorker: true,
  },
};

export default config;

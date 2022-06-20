/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "",
  },
};

(module.exports = nextConfig),
  withPWA({
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
    },
  });

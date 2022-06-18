/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa'); 
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai', 
    path: '',
  }, 
  typescript: {
     ignoreBuildErrors: true,
  },
}

module.exports = nextConfig, withPWA

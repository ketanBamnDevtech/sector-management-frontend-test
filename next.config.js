/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodburl: process.env.MONGODB_URI,
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Add "res.cloudinary.com" to the allowed domains
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://127.0.0.1:5000/:path*', // Change this to your actual API URL
  //     },
  //   ];
  // },
  reactStrictMode: true,
  output: "standalone"
}

module.exports = nextConfig

// module.exports = withBundleAnalyzer(nextConfig);
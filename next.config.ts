/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force all pages to be dynamic during build
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Skip static optimization
  output: 'standalone', // Remove this if you need static export
}

module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      loaders: {
        '.svg': ['@svgr/webpack'],
      },
    },
  },
  transpilePackages: ['lucide-react'],
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
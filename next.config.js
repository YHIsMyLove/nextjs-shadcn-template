/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  experimental: {
    turbo: {
      loaders: {
        '.svg': ['@svgr/webpack'],
      },
    },
  },
  transpilePackages: ['lucide-react'],
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/nextjs-shadcn-template' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/nextjs-shadcn-template' : '',
}

module.exports = nextConfig
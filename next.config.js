/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'safehaven-insurance.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      }
    ],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['@prisma/client'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      layers: true,
    };
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };
    return config;
  },
  poweredByHeader: false,
  output: 'standalone',
  generateBuildId: async () => {
    return 'build'
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  trailingSlash: false,
  distDir: '.next'
}

module.exports = nextConfig 
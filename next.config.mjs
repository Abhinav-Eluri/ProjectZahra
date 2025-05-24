/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    // Remove domains, use remotePatterns instead if needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.onrender.com',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
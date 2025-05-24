/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure dynamic routes are properly handled during build
  output: 'standalone',

  // Add additional configuration for handling dynamic routes
  experimental: {
    // This helps with handling dynamic routes during build
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;

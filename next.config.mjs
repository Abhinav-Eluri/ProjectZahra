/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure dynamic routes are properly handled during build
  output: 'standalone',
  images: {
    unoptimized: true, // Add this if having issues with optimization
    domains: ['onrender.com'], // Add external domains if needed
  },

  // Add additional configuration for handling dynamic routes
  experimental: {
    // This helps with handling dynamic routes during build
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;

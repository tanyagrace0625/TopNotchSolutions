/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from external sources if needed
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Suppress Tailwind/TS warnings from scaffold
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xkvfftkihtwosoakozsx.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'kjmkzfrszdgoigryzwey.supabase.co',
      },
    ],
  },
};

export default nextConfig;

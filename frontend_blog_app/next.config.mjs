/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev',
      },
      {
        protocol: 'https',
        hostname: 'cdn.hack.ngo',
      },
    ],
  },
  // output: "export",
  // basePath: '',
  // trailingSlash: true,
};

export default nextConfig;

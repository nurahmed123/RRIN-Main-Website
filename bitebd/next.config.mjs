/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['files.edgestore.dev', 'assets.aceternity.com'], // Add the domain for next/image support
    },
};

export default nextConfig;


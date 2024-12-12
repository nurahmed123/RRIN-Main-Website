import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['files.edgestore.dev'], // Add the domain for next/image support
    },
};

const sentryWebpackPluginOptions = {
    silent: true,
    org: "education-a7",
    project: "javascript-nextjs",
    hideSourceMaps: true, // Hides source maps from client bundles
    disableLogger: true,
    deleteSourceMapsAfterUpload: true, // Automatically delete source maps after upload
};



export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);

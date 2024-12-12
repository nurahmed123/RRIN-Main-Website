import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['files.edgestore.dev'], // Add the domain for next/image support
    },
};

const sentryWebpackPluginOptions = {
    silent: true,
    org: 'education-a7', // Ensure this matches your Sentry token's organization
    project: 'javascript-nextjs', // Ensure this matches the Sentry project name
    hideSourceMaps: true,
    disableLogger: true,
};


export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);

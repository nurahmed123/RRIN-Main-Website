import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['files.edgestore.dev'], // Add the domain for next/image support
    },
};

const sentryWebpackPluginOptions = {
    silent: true, // Suppresses source map uploading logs during build
    org: 'javascript-mastery', // Replace with your Sentry org
    project: 'javascript-nextjs', // Replace with your Sentry project

    // Optional optimizations to reduce build size/time
    hideSourceMaps: true, // Hides source maps from client bundles
    disableLogger: true, // Removes Sentry logger statements
    widenClientFileUpload: false, // Disable if build times are an issue
    transpileClientSDK: false, // Disable if IE11 support isn't required
    automaticVercelMonitors: true, // Enable Vercel Cron Monitors
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);

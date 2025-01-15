import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

import { paths } from '@/helpers/map-routes';

// ----------------------------------------------------------------------

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },

  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: false,
  },

  experimental: {
    ppr: 'incremental',
  },

  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
        pathname: '/**',
        port: '',
        protocol: 'https',
        search: '',
      },
    ],
  },

  redirects: async () => {
    return [
      {
        destination: paths.dashboard.root.to(),
        permanent: true,
        source: paths.root.to(),
      },
    ];
  },

  typescript: {
    ignoreBuildErrors: false,
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  org: 'ahmadmhdyones',

  project: 'image-annotation-manager-nextjs',

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,
});

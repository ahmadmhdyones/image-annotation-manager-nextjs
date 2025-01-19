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
    ignoreDuringBuilds: true,
  },

  experimental: {
    ppr: 'incremental',
  },

  images: {
    remotePatterns: [
      {
        hostname: '*',
        pathname: '/**',
        port: '',
        protocol: 'https',
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
    ignoreBuildErrors: true,
  },
};

export default withSentryConfig(nextConfig, {
  automaticVercelMonitors: true,
  disableLogger: true,
  hideSourceMaps: true,

  org: 'ahmadmhdyones',
  project: 'image-annotation-manager-nextjs',

  reactComponentAnnotation: { enabled: true },
  silent: !process.env.CI,
  sourcemaps: { disable: false },
  widenClientFileUpload: true,
});

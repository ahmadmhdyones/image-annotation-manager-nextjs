import type { NextConfig } from 'next';

import { paths } from '@/helpers/map-routes';

// ----------------------------------------------------------------------

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src'],
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
};

export default nextConfig;

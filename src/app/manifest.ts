import { MetadataRoute } from 'next';

import { SITE } from '@/configs/site.config';

// ----------------------------------------------------------------------

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: '#FFFFFF',
    description: SITE.description,
    display: 'standalone',
    icons: [
      {
        sizes: 'any',
        src: '/favicon.ico',
        type: 'image/x-icon',
      },
    ],
    name: SITE.name,
    short_name: 'IAM Next',
    start_url: '/',
    theme_color: '#000000',
  };
}

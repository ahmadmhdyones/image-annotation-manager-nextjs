import { type MetadataRoute } from 'next';

import { SITE } from '@/configs/site.config';

// ----------------------------------------------------------------------

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        allow: '/',
        disallow: ['/api/'],
        userAgent: '*',
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}

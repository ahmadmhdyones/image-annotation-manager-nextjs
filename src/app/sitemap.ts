import { type MetadataRoute } from 'next';

import { SITE } from '@/configs/site.config';

import { paths } from '@/helpers/map-routes';

// ----------------------------------------------------------------------

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: 'never',
      lastModified: new Date(),
      priority: 1,
      url: SITE.url,
    },
    {
      changeFrequency: 'weekly',
      lastModified: new Date(),
      priority: 0.8,
      url: paths.dashboard.root.to(),
    },
    {
      changeFrequency: 'daily',
      lastModified: new Date(),
      priority: 0.5,
      url: paths.dashboard.categories.root.to(),
    },
    {
      changeFrequency: 'daily',
      lastModified: new Date(),
      priority: 0.5,
      url: paths.dashboard.images.root.to(),
    },
  ];
}

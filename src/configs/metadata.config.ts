import { Metadata } from 'next';

import { SITE } from '@/configs/site.config';

// ----------------------------------------------------------------------

const siteOgImage = `${SITE.url}/images/og.jpg`;

export const configAppRootMetadata: Metadata = {
  authors: [{ name: 'Ahmad Yones', url: 'https://github.com/ahmadmhdyones' }],
  creator: 'Ahmad Yones',
  description: SITE.description,
  keywords: ['Next.js', 'MUI', 'Vercel', 'Konva', 'Typescript'],
  manifest: `${SITE.url}/manifest.json`,
  metadataBase: new URL(SITE.url),
  openGraph: {
    description: SITE.description,
    images: [siteOgImage],
    locale: 'en_US',
    siteName: SITE.name,
    title: SITE.name,
    type: 'website',
    url: SITE.url,
  },
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  twitter: {
    card: 'summary_large_image',
    creator: '@ahmadmhdyones',
    description: SITE.description,
    images: [siteOgImage],
    title: SITE.name,
  },
};

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const SITE = {
  description: 'An application to manage image annotation using Typescript Nextjs.',
  name: 'Image Annotation Manager Nextjs',
  url: siteUrl,
};

export type ConfigSite = typeof SITE;

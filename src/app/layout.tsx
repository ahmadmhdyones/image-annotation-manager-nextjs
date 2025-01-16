import type { Metadata } from 'next';
import { NextAppProvider } from '@toolpad/core/nextjs';

import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import Logo from '@/components/ui/logo';

import { SITE } from '@/configs/site.config';
import { fonts } from '@/configs/fonts.config';
import { NAVIGATION } from '@/configs/navigation.config';
import { configAppRootMetadata } from '@/configs/metadata.config';

import theme from '@/theme';
import ReactQueryProvider from '@/helpers/react-query';

// ----------------------------------------------------------------------

export const metadata: Metadata = configAppRootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-toolpad-color-scheme='light' lang='en'>
      <body className={`${fonts.roboto.className}`}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <NextAppProvider
            branding={{
              logo: <Logo />,
              title: SITE.name
                .split(' ')
                .map(word => word.charAt(0).toUpperCase())
                .join(' '),
            }}
            navigation={NAVIGATION}
            theme={theme}
          >
            <CssBaseline />
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </NextAppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

import { Roboto } from 'next/font/google';

// ----------------------------------------------------------------------

export const fonts = {
  roboto: Roboto({
    display: 'swap',
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: ['300', '400', '500', '700'],
  }),
};

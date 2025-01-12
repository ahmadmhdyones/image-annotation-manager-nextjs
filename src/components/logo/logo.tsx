import Link from 'next/link';

import Box, { BoxProps } from '@mui/material/Box';
import { default as MUILink } from '@mui/material/Link';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

export default function Logo({ disabledLink = false, sx, ...other }: LogoProps) {
  const logo = (
    <Box component='img' src='/logo.svg' sx={{ cursor: 'pointer', height: 36, width: 36, ...sx }} {...other} />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <MUILink component={Link} href='/' sx={{ display: 'contents' }}>
      {logo}
    </MUILink>
  );
}

import Link from 'next/link';
import { Metadata } from 'next';

import { Box, Button, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  description: 'The page you are looking for does not exist or has been moved.',
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
      }}
    >
      <Typography component='div' gutterBottom variant='h1'>
        404
      </Typography>
      <Typography component='h2' gutterBottom variant='h4'>
        Page Not Found
      </Typography>
      <Typography sx={{ marginBottom: 4 }} variant='body1'>
        Sorry, the page you're looking for doesn't exist. You can return to the homepage.
      </Typography>
      <Link href='/' passHref>
        <Button sx={{ textTransform: 'none' }} variant='contained'>
          Go to Homepage
        </Button>
      </Link>
    </Box>
  );
}

import Link from 'next/link';

import { Box, Button, Typography } from '@mui/material';

import { paths } from '@/helpers/map-routes';

// ----------------------------------------------------------------------

export default function ImagesCanvasNotFound() {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100vh',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Typography color='primary' gutterBottom variant='h3'>
        Oops! Image Not Found
      </Typography>
      <Typography color='textSecondary' gutterBottom variant='body1'>
        The image you are looking for does not exist or may have been removed.
      </Typography>

      {/* TODO: Add search form */}

      <Box display='flex' gap={2}>
        <Button color='primary' component={Link} href={paths.dashboard.images.root.to()} variant='contained'>
          Back to Gallery
        </Button>

        <Button color='secondary' component={Link} href={paths.root.to()} variant='outlined'>
          Go Home
        </Button>
      </Box>
    </Box>
  );
}

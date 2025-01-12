'use client';

import { useEffect } from 'react';

import { Box, Stack, Button, Container, Typography } from '@mui/material';

import Logo from '@/components/logo/logo';

// ----------------------------------------------------------------------

export default function GlobalError({ error, reset }: { error: { digest?: string } & Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <Box
          sx={{
            alignItems: 'center',
            bgcolor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <Container maxWidth='sm'>
            <Box
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1,
                p: 4,
              }}
            >
              <Stack alignItems='center' spacing={3}>
                <Logo sx={{ height: 48, width: 48 }} />

                <Typography component='h1' gutterBottom variant='h4'>
                  Something went wrong!
                </Typography>

                <Typography align='center' color='text.secondary' sx={{ mb: 2 }}>
                  An unexpected error has occurred. We&apos;ve been notified and are working to fix the issue.
                </Typography>

                <Button onClick={() => reset()} size='large' variant='contained'>
                  Try again
                </Button>
              </Stack>
            </Box>
          </Container>
        </Box>
      </body>
    </html>
  );
}

import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component='header'>
        <Typography variant='h1'>Image Annotation Manager Next.js</Typography>
      </Box>
      <Box component='main' sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Box component='footer'>Footer</Box>
    </Box>
  );
}

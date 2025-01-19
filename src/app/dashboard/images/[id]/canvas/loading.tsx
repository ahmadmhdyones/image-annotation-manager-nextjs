import { Box, Stack, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function CanvasLoading() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header skeleton */}
      <Box
        component='header'
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          px: 2,
          py: { md: 0.5, xs: 1 },
        }}
      >
        <Stack spacing={1}>
          <Box
            sx={{
              alignItems: { md: 'center', xs: 'flex-start' },
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              gap: { md: 0, xs: 1 },
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {/* Title skeleton */}
            <Stack
              alignItems={{ md: 'center', xs: 'flex-start' }}
              direction='row'
              spacing={1}
              sx={{ flex: 1, maxWidth: '90%', minWidth: 0, paddingRight: { md: 1 } }}
            >
              <Skeleton height={32} width='60%' />
            </Stack>

            {/* Metadata skeleton */}
            <Stack
              alignItems={'center'}
              direction='row'
              justifyContent={{ md: 'flex-end', xs: 'space-between' }}
              spacing={1}
              sx={{ width: { md: 'fit-content', xs: '100%' } }}
            >
              <Skeleton height={24} width={100} />
              <Skeleton height={20} width={200} />
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Canvas area skeleton */}
      <Box sx={{ flex: 1, position: 'relative' }}>
        <Skeleton sx={{ height: '100%', transform: 'none', width: '100%' }} variant='rectangular' />
      </Box>
    </Box>
  );
}

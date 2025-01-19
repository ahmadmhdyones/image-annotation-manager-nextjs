import { Box, Stack, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function FormSkeleton() {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack spacing={2}>
        <Stack direction={{ sm: 'row', xs: 'column' }} spacing={1}>
          {/* Search input and button skeleton */}
          <Skeleton height={40} sx={{ borderRadius: 1 }} variant='rectangular' width='100%' />
          <Skeleton
            sx={{
              borderRadius: 1,
              height: 40,
              width: { sm: 100, xs: '100%' },
            }}
            variant='rectangular'
          />
        </Stack>

        <Stack direction={{ sm: 'row', xs: 'column' }} spacing={2}>
          {/* Format and Resolution autocomplete skeletons */}
          <Skeleton
            sx={{
              borderRadius: 1,
              height: 56,
              width: { sm: 200, xs: '100%' },
            }}
            variant='rectangular'
          />
          <Skeleton
            sx={{
              borderRadius: 1,
              height: 56,
              width: { sm: 200, xs: '100%' },
            }}
            variant='rectangular'
          />
        </Stack>
      </Stack>
    </Box>
  );
}

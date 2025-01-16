import { PageContainer } from '@toolpad/core/PageContainer';

import { Box, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function CategoriesEditLoading() {
  return (
    <PageContainer
      breadcrumbs={[{ title: 'Dashboard' }, { title: 'Categories' }, { title: '...' }, { title: 'Edit' }]}
      title='Loading...'
    >
      <Box
        component='section'
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          margin: '0 auto',
          maxWidth: 640,
          minWidth: { md: 500 },
          mt: 4,
          p: 2,
        }}
      >
        {/* Title Skeleton */}
        <Skeleton sx={{ mb: 4, mx: 'auto', width: '200px' }} variant='text' />

        {/* Name Field Skeleton */}
        <Skeleton height={56} sx={{ mb: 2, width: '100%' }} variant='rounded' />

        {/* Description Field Skeleton */}
        <Box sx={{ mb: 2 }}>
          <Skeleton sx={{ mb: 1, width: '100px' }} variant='text' />
          <Skeleton height={300} sx={{ width: '100%' }} variant='rounded' />
        </Box>

        {/* Submit Button Skeleton */}
        <Skeleton height={50} sx={{ width: '100%' }} variant='rounded' />
      </Box>
    </PageContainer>
  );
}

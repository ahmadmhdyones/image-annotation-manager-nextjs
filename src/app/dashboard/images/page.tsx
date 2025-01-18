import { Metadata } from 'next';
import { Suspense } from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';

import { Box } from '@mui/material';

import ImageFilterForm from '@/components/image-filter-form';
import ImagesList, { ImagesListSkeleton } from '@/components/images-list';

import { paths } from '@/helpers/map-routes';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Images',
};

export const experimental_ppr = true;

export default function ImagesListPage() {
  return (
    <PageContainer id={paths.dashboard.images.root.id}>
      <Box sx={{ height: '100%', width: '100%' }}>
        <ImageFilterForm />

        <Suspense fallback={<ImagesListSkeleton />}>
          <ImagesList />
        </Suspense>
      </Box>
    </PageContainer>
  );
}

import { Metadata } from 'next';
import { Suspense } from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';

import { Box } from '@mui/material';

import ImagesList from '@/components/images-list';
import ImageFilterForm, { ImageFilterFormSkeleton } from '@/components/image-filter-form';

import { paths } from '@/helpers/map-routes';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Images',
};

export default function ImagesListPage() {
  return (
    <PageContainer id={paths.dashboard.images.root.id}>
      {/* ------------------------- <Images List Section> ------------------------ */}
      <Box component='section'>
        <Suspense fallback={<ImageFilterFormSkeleton />}>
          <ImageFilterForm />
        </Suspense>

        <ImagesList />
      </Box>
      {/* ------------------------- </Images List Section> ------------------------ */}
    </PageContainer>
  );
}

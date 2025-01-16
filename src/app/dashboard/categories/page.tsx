import Link from 'next/link';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';

import { Add } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

import { CategoriesList, CategoriesListCount, CategoriesListSkeleton } from '@/components/categories-list';

import { paths } from '@/helpers/map-routes';

// ----------------------------------------------------------------------

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: 'Categories',
};

export default function CategoriesListPage() {
  return (
    <PageContainer id={paths.dashboard.categories.root.id}>
      {/* ------------------------- <Categories List Section> ------------------------ */}
      <Box component='section'>
        <Box alignItems='center' display='flex' justifyContent='space-between' mb={2}>
          <Typography variant='h6'>Total items: {<CategoriesListCount />}</Typography>

          <Button component={Link} href={paths.dashboard.categories.new.to()} startIcon={<Add />} variant='contained'>
            Create New
          </Button>
        </Box>

        <Suspense fallback={<CategoriesListSkeleton />}>
          <CategoriesList />
        </Suspense>
      </Box>
      {/* ------------------------- </Categories List Section> ------------------------ */}
    </PageContainer>
  );
}

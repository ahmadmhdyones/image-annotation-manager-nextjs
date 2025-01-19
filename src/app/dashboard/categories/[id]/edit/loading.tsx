import { PageContainer } from '@toolpad/core/PageContainer';

import { Box } from '@mui/material';

import { CategoryFormSkeleton } from '@/components/category-form';

// ----------------------------------------------------------------------

export default function CategoriesEditLoading() {
  return (
    <PageContainer
      breadcrumbs={[{ title: 'Dashboard' }, { title: 'Categories' }, { title: '...' }, { title: 'Edit' }]}
      title='Loading...'
    >
      <Box component={'section'}>
        <CategoryFormSkeleton />
      </Box>
    </PageContainer>
  );
}

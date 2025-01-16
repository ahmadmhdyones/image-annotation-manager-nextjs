import { PageContainer } from '@toolpad/core/PageContainer';

import { Box } from '@mui/material';

import CategoryForm from '@/components/category-form';

import { paths } from '@/helpers/map-routes';
import { categoryAPI } from '@/helpers/api/resources/category';

// ----------------------------------------------------------------------

/**
 * Edit Category Page
 *
 * - Enhances UX by displaying a loading screen during category data fetch
 * - Reusing the create form component for consistency and maintainability
 */

export default async function CategoriesEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const category = await categoryAPI.getOne(Number(id));

  return (
    <PageContainer
      breadcrumbs={[
        { path: paths.dashboard.root.to(), title: 'Dashboard' },
        { path: paths.dashboard.categories.root.to(), title: 'Categories' },
        { title: category.id.toString() },
        { path: paths.dashboard.categories.id.edit.to(id), title: 'Edit' },
      ]}
      id={paths.dashboard.categories.id.edit.id}
      title={`${category.name}`}
    >
      {/* ------------------------- <Category Form> ------------------------ */}
      <Box component={'section'}>
        <CategoryForm category={category} />
      </Box>
      {/* ------------------------- </Category Form> ------------------------ */}
    </PageContainer>
  );
}

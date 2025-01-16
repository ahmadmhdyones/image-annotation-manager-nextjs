import { PageContainer } from '@toolpad/core/PageContainer';

import CategoryForm from '@/components/category-form';

import { paths } from '@/helpers/map-routes';

// ----------------------------------------------------------------------

export default function CategoriesNewPage() {
  return (
    <PageContainer
      breadcrumbs={[
        { path: paths.dashboard.root.to(), title: 'Dashboard' },
        { path: paths.dashboard.categories.root.to(), title: 'Categories' },
        { path: paths.dashboard.categories.new.to(), title: 'New' },
      ]}
      id={paths.dashboard.categories.new.id}
    >
      {/* ------------------------- <Category Form> ------------------------ */}
      <CategoryForm />
      {/* ------------------------- </Category Form> ------------------------ */}
    </PageContainer>
  );
}

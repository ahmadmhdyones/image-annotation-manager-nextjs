import { PageContainer } from '@toolpad/core/PageContainer';

// ----------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <PageContainer
      breadcrumbs={[
        { path: '/dashboard', title: 'Dashboard' },
        { path: '/dashboard/images', title: 'Images' },
      ]}
      title='Dashboard'
    >
      <div>Welcome</div>
    </PageContainer>
  );
}

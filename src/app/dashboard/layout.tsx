import { Metadata } from 'next';
import { PageContainer } from '@toolpad/core/PageContainer';
import { DashboardLayout as MUIDashboardLayout } from '@toolpad/core/DashboardLayout';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MUIDashboardLayout>
      <PageContainer>{children}</PageContainer>
    </MUIDashboardLayout>
  );
}

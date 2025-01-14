import { Metadata } from 'next';
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
  return <MUIDashboardLayout>{children}</MUIDashboardLayout>;
}

import { DashboardLayout as MUIDashboardLayout } from '@toolpad/core/DashboardLayout';

// ----------------------------------------------------------------------

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MUIDashboardLayout>{children}</MUIDashboardLayout>;
}

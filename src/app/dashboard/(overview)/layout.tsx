import { Metadata } from 'next';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Dashboard Overview',
};

export default function DashboardOverviewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

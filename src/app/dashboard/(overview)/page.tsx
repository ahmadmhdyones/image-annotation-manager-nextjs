'use client';

import { PageContainer } from '@toolpad/core/PageContainer';

import { Grid } from '@mui/material';

import StatsCard from '@/components/stats/stats-card';
import StatsChart from '@/components/stats/stats-chart';

import { paths } from '@/helpers/map-routes';

import { stats } from './_model/stats';

// ----------------------------------------------------------------------

export default function DashboardOverviewPage() {
  return (
    <PageContainer
      breadcrumbs={[{ path: paths.dashboard.root.to(), title: 'Dashboard' }]}
      id={paths.dashboard.root.id}
      title='Overview'
    >
      <Grid component={'section'} container spacing={3}>
        {stats.map((stat, index) => {
          return stat.type === 'card' ? (
            <Grid item key={index} sm={4} xs={12}>
              <StatsCard icon={stat.icon} queryFn={stat.queryFn} queryKey={stat.queryKey} title={stat.title} />
            </Grid>
          ) : (
            <Grid item key={index} md={6} xs={12}>
              <StatsChart fn={stat.queryFn} queryKey={stat.queryKey} title={stat.title} />
            </Grid>
          );
        })}
      </Grid>
    </PageContainer>
  );
}

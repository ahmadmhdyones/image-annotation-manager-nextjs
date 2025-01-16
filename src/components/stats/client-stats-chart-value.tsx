'use client';

import { useQuery } from '@tanstack/react-query';

import { Box, Skeleton, Typography } from '@mui/material';
import { BarChart, PieChart, LineChart } from '@mui/x-charts';

import { queryKeys } from '@/helpers/react-query';

// ----------------------------------------------------------------------

export interface ClientStatsChartValueProps {
  fn: () => Promise<any>;
  queryKey: string[] | readonly unknown[];
}

export default function ClientStatsChartValue({ fn, queryKey }: ClientStatsChartValueProps) {
  const { data, error, isFetching, isLoading, isPending } = useQuery({
    queryFn: fn,
    queryKey,
  });

  if (error)
    return (
      <Box sx={{ alignItems: 'center', display: 'flex', height: 300, justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center', width: '90%' }}>
          <Typography color='error' gutterBottom variant='subtitle1'>
            Unable to load chart
          </Typography>
          <Typography color='text.secondary' variant='body2'>
            {error instanceof Error ? error.message : 'An error occurred while fetching data'}
          </Typography>
        </Box>
      </Box>
    );

  if (isLoading || isFetching || isPending) {
    return (
      <Box sx={{ alignItems: 'center', display: 'flex', height: 300, justifyContent: 'center' }}>
        <Skeleton height={250} sx={{ borderRadius: '7px' }} variant='rectangular' width='90%' />
      </Box>
    );
  }

  if (queryKey[0] === queryKeys.annotations()) {
    return (
      <PieChart
        height={300}
        series={[
          {
            data: [
              { id: 'Rectangle', label: 'Rectangle', value: 50 },
              { id: 'Circle', label: 'Circle', value: 30 },
              { id: 'Polygon', label: 'Polygon', value: 20 },
            ],
            highlightScope: { fade: 'global', highlight: 'item' },
          },
        ]}
      />
    );
  } else if (queryKey[0] === queryKeys.categories()) {
    return (
      <BarChart
        height={300}
        series={[{ data: [40, 25, 15] }]}
        xAxis={[{ data: ['Nature', 'Urban', 'Abstract'], scaleType: 'band' }]}
      />
    );
  } else if (queryKey[0] === queryKeys.images()) {
    return (
      <LineChart
        height={300}
        series={[{ data: [10, 15, 25] }]}
        xAxis={[{ data: ['Jan', 'Feb', 'Mar'], scaleType: 'band' }]}
      />
    );
  }

  return data;
}

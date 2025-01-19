'use client';

import { useQuery } from '@tanstack/react-query';

import { Box, Skeleton, Typography } from '@mui/material';
import { BarChart, PieChart, LineChart } from '@mui/x-charts';

import { IAnnotation } from '@/types/models/annotation.types';

import { queryKeys } from '@/helpers/react-query';

// ----------------------------------------------------------------------

/**
 * ClientStatsChartValue Component
 *
 * A simplified chart abstraction layer that intentionally:
 * - Uses hardcoded implementations for demonstration purposes
 * - Skips optimizations (lazy loading, code splitting) for clarity
 * - Shows different chart types based on queryKey parameter
 */

export interface ClientStatsChartValueProps {
  fn: () => Promise<any>;
  queryKey: string[] | readonly unknown[];
}

export default function ClientStatsChartValue({ fn, queryKey }: ClientStatsChartValueProps) {
  const { data, error, isLoading, isRefetching } = useQuery({
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

  if (isLoading || isRefetching) {
    return (
      <Box sx={{ alignItems: 'center', display: 'flex', height: 300, justifyContent: 'center' }}>
        <Skeleton height={250} sx={{ borderRadius: '7px' }} variant='rectangular' width='90%' />
      </Box>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* -------------------------- Hardcoded chart types -------------------------- */
  /* -------------------------------------------------------------------------- */
  if (queryKey[0] === queryKeys.annotations()) {
    // Group annotations by type and count occurrences
    const annotationCounts = data.reduce((acc: Record<string, number>, annotation: IAnnotation) => {
      const { type } = annotation;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    // Transform the counts into the format required by PieChart
    const chartData = Object.entries(annotationCounts).map(([type, count]) => ({
      id: type,
      label: type,
      value: count,
    }));

    return (
      <PieChart
        height={300}
        series={[{ data: chartData as any, highlightScope: { fade: 'global', highlight: 'item' } }]}
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

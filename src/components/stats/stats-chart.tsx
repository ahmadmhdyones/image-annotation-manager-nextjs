import { Card, Typography, CardContent } from '@mui/material';

import { cardStyle } from './styles';
import ClientStatsChartValue, { ClientStatsChartValueProps } from './client-stats-chart-value';

// ----------------------------------------------------------------------

/**
 * StatsChart Component
 *
 * An autonomous dashboard chart that:
 * - Acts as an independent data unit with its own React Query (fn, queryKey)
 * - Abstracts data fetching logic from parent components
 * - Can be reused across the dashboard with different data sources
 * - Handles type of chart based on queryKey parameter (hardcoded for demo purposes)
 */

interface StatsChartProps extends ClientStatsChartValueProps {
  title: string;
}

export default function StatsChart({ fn, queryKey: queryKeys, title }: StatsChartProps) {
  return (
    <Card component={'article'} sx={cardStyle}>
      <CardContent>
        <Typography variant='h6'>{title}</Typography>
        <ClientStatsChartValue fn={fn} queryKey={queryKeys} />
      </CardContent>
    </Card>
  );
}

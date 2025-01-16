import { Card, Typography, CardContent } from '@mui/material';

import { cardStyle } from './styles';
import ClientStatsChartValue, { ClientStatsChartValueProps } from './client-stats-chart-value';

// ----------------------------------------------------------------------

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

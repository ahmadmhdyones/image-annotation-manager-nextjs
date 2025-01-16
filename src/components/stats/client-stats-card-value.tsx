'use client';

import { useQuery } from '@tanstack/react-query';

import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export interface ClientStatsCardValueProps {
  queryFn: () => Promise<any>;
  queryKey: string[] | readonly unknown[];
}

export default function ClientStatsCardValue({ queryFn, queryKey }: ClientStatsCardValueProps) {
  const { data, error, isFetching, isLoading, isPending } = useQuery({
    queryFn,
    queryKey,
  });

  if (error)
    return (
      <Typography color='error' variant='inherit'>
        {error instanceof Error ? error.message : 'An error occurred'}
      </Typography>
    );

  if (isLoading || isFetching || isPending) return <Skeleton height={36} width={60} />;

  return data;
}

'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Box, Skeleton } from '@mui/material';

import { categoryAPI } from '@/helpers/api/resources/category';
import { queryKeys } from '@/helpers/react-query/query-keys.enum';

// ----------------------------------------------------------------------

export default function ListCount() {
  const {
    data: count,
    isError,
    isFetching,
    isLoading,
    isPending,
  } = useQuery({
    queryFn: () => categoryAPI.getCount(),
    queryKey: [queryKeys.categoriesCount()],
  });

  if (isLoading || isFetching || isPending)
    return (
      <Box sx={{ display: 'inline-block' }}>
        <Skeleton variant='text' width={30} />
      </Box>
    );

  if (isError) return 'N/A';

  return count;
}

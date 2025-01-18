'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Box, Skeleton } from '@mui/material';

import { categoryAPI } from '@/helpers/api/resources/category';
import { queryKeys } from '@/helpers/react-query/query-keys.enum';

// ----------------------------------------------------------------------

/**
 * ListCount Component
 *
 * Displays total categories count with real-time updates through React Query's cache invalidation
 * when categories are modified in the list page.
 */

export default function ListCount() {
  const {
    data: count,
    isError,
    isLoading,
    isRefetching,
  } = useQuery({
    queryFn: () => categoryAPI.getCount(),
    queryKey: [queryKeys.categoriesCount()],
  });

  if (isLoading || isRefetching)
    return (
      <Box sx={{ display: 'inline-block' }}>
        <Skeleton variant='text' width={30} />
      </Box>
    );

  if (isError) return '-';

  return count;
}

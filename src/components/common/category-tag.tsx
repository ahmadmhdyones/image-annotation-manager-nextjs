'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import { Chip, Skeleton } from '@mui/material';

import { ICategory } from '@/types/models/category.types';

import { paths } from '@/helpers/map-routes';
import { queryKeys } from '@/helpers/react-query';
import { categoryAPI } from '@/helpers/api/resources/category';

// ----------------------------------------------------------------------

export default function CategoryTag({ categoryId }: { categoryId: ICategory['id'] }) {
  const { data: category, isLoading } = useQuery({
    queryFn: () => categoryAPI.getOne(categoryId),
    queryKey: [queryKeys.category(categoryId)],
  });

  if (isLoading) {
    return <Skeleton height={24} sx={{ borderRadius: 12 }} variant='rectangular' width={80} />;
  }

  return (
    <Chip
      clickable
      component={Link}
      href={{
        pathname: paths.dashboard.images.root.to(),
        query: { ...Object.fromEntries(new URLSearchParams(window.location.search)), category: categoryId },
      }}
      label={category?.name}
      size='small'
      sx={{ '& .MuiChip-label': { px: 1.5 }, 'borderRadius': 1.5 }}
    />
  );
}

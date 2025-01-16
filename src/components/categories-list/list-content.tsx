'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Edit, Delete } from '@mui/icons-material';
import { Box, Avatar, ListItem, IconButton, ListItemText, ListItemAvatar, List as ListMUI } from '@mui/material';

import { ICategory } from '@/types/models/category.types';

import { paths } from '@/helpers/map-routes';
import { categoryAPI } from '@/helpers/api/resources/category';
import { queryKeys } from '@/helpers/react-query/query-keys.enum';

import ListSkeleton from './list-skeleton';

// ----------------------------------------------------------------------

export default function ListContent({ initialData }: { initialData?: ICategory[] }) {
  const queryClient = useQueryClient();
  const {
    data: categories = [],
    isFetching,
    isLoading,
    isPending,
    isRefetching,
  } = useQuery({
    initialData,
    queryFn: () => categoryAPI.getMany(),
    queryKey: [queryKeys.categories()],
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => categoryAPI.delete(id),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return (
    <ListMUI sx={{ padding: { md: 1, xs: 0 } }}>
      {isLoading || isFetching || isPending || isRefetching ? (
        <ListSkeleton />
      ) : (
        categories.map(category => (
          <ListItem key={category.id}>
            <ListItemAvatar sx={{ marginBottom: 'auto' }}>
              <Avatar>{category.id}</Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={category.name}
              secondary={category.description || 'No description available.'}
              slotProps={{
                secondary: {
                  sx: {
                    display: '-webkit-box',
                    overflow: 'hidden',
                    paddingRight: 1,
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                  },
                },
              }}
            />

            <Box sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' }, gap: { md: 2, xs: 1 } }}>
              <IconButton
                edge='end'
                href={paths.dashboard.categories.id.edit.to(category.id.toString())}
                LinkComponent={Link}
              >
                <Edit />
              </IconButton>
              {!deleteMutation.isPending && (
                <IconButton edge='end' onClick={async () => await deleteMutation.mutateAsync(category.id)}>
                  <Delete />
                </IconButton>
              )}
            </Box>
          </ListItem>
        ))
      )}
    </ListMUI>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Edit, Delete } from '@mui/icons-material';
import { Box, Avatar, ListItem, IconButton, ListItemText, ListItemAvatar } from '@mui/material';

import { ICategory } from '@/types/models/category.types';

import { paths } from '@/helpers/map-routes';
import { categoryAPI } from '@/helpers/api/resources/category';
import { queryKeys } from '@/helpers/react-query/query-keys.enum';

import ListSkeleton from './list-skeleton';

// ----------------------------------------------------------------------

/**
 * ListContent Component
 *
 * Displays and manages the categories list with server-side initial data for optimal performance.
 * Handles category deletion while automatically updating related data through react-query cache invalidation.
 */

export default function ListContent({ initialData }: { initialData?: ICategory[] }) {
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading } = useQuery({
    initialData,
    queryFn: () => categoryAPI.getMany(),
    queryKey: [queryKeys.categories()],
  });

  const { isPending: isDeleting, mutate: deleteMutation } = useMutation({
    mutationFn: (id: number) => categoryAPI.delete(id),
    onSuccess: () => queryClient.invalidateQueries(), // => category will affect on images related to it, and images will affect on annotations related to them
  });

  const handleDelete = (id: number) => {
    deleteMutation(id);
  };

  return (
    <>
      {isLoading ? (
        <ListSkeleton />
      ) : (
        categories.map(({ description, id, image, name }) => (
          <ListItem key={id}>
            <ListItemAvatar sx={{ marginBottom: 'auto' }}>
              {image ? (
                <Avatar>
                  <Image alt={name} height={50} src={image} width={50} />
                </Avatar>
              ) : (
                <Avatar>{id}</Avatar>
              )}
            </ListItemAvatar>

            <ListItemText
              primary={name}
              secondary={description || 'No description available.'}
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
                disabled={isDeleting}
                edge='end'
                href={paths.dashboard.categories.id.edit.to(id.toString())}
                LinkComponent={Link}
              >
                <Edit />
              </IconButton>

              <IconButton disabled={isDeleting} edge='end' onClick={() => handleDelete(id)}>
                <Delete />
              </IconButton>
            </Box>
          </ListItem>
        ))
      )}
    </>
  );
}

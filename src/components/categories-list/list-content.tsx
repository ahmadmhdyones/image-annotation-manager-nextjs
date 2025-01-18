'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { Edit, Delete } from '@mui/icons-material';
import { Box, Avatar, ListItem, IconButton, ListItemText, ListItemAvatar } from '@mui/material';

import { ICategory } from '@/types/models/category.types';

import { paths } from '@/helpers/map-routes';
import { categoryAPI } from '@/helpers/api/resources/category';
import { queryKeys } from '@/helpers/react-query/query-keys.enum';

import ListSkeleton from './list-skeleton';
import { useDeleteCategory } from './hooks/use-delete-category';
import useInvalidateCategories from './hooks/use-invalidate-categories';

// ----------------------------------------------------------------------

/**
 * Category Form Component
 *
 * Optimizes data management by:
 * - Using optimistic updates for immediate UI feedback
 * - Invalidating related queries on successful mutations
 * - Cleaning up query cache on component unmount
 * - Reusing form logic for both create and edit operations
 */

export default function ListContent({ initialData }: { initialData?: ICategory[] }) {
  const {
    data: categories = [],
    isLoading,
    isRefetching,
  } = useQuery({
    initialData,
    queryFn: () => categoryAPI.getMany(),
    queryKey: [queryKeys.categories()],
  });

  const { isPending: isDeleting, mutate: deleteMutation } = useDeleteCategory();

  useInvalidateCategories();

  return (
    <>
      {isLoading || isRefetching ? (
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

              <IconButton disabled={isDeleting} edge='end' onClick={() => deleteMutation(id)}>
                <Delete />
              </IconButton>
            </Box>
          </ListItem>
        ))
      )}
    </>
  );
}

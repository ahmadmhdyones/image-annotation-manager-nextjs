'use client';

import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

import { Edit, Delete, LocalOffer } from '@mui/icons-material';
import { Box, Avatar, ListItem, IconButton, ListItemText, ListItemAvatar } from '@mui/material';

import EmptyContent from '@/components/ui/empty-content';
import ErrorContent from '@/components/ui/error-content';
import ConfirmActionButton from '@/components/ui/confirm-action-button';

import { ICategory } from '@/types/models/category.types';

import { paths } from '@/helpers/map-routes';

import ListSkeleton from './list-skeleton';
import useGetCategories from './hooks/use-get-categories';
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

export default function ListContent({ initialData = [] }: { initialData?: ICategory[] }) {
  const { data: categories = [], error, isError, isLoading, isRefetching } = useGetCategories(initialData);

  const {
    error: deleteError,
    isError: isDeleteError,
    isPending: isDeleting,
    isSuccess: isDeleted,
    mutate: deleteMutation,
  } = useDeleteCategory();

  // Revalidate categories when deletion is successful or there is an error
  useInvalidateCategories({ shouldInvalidate: isDeleted || isDeleteError });

  if (isError) return <ErrorContent error={error} />;
  if (isLoading) return <ListSkeleton />;
  if (isDeleteError) {
    toast.error('Something went wrong while deleting the category, please reload the page.');
    return <ErrorContent error={deleteError} />;
  }

  if (categories.length === 0) {
    return (
      <EmptyContent
        description='Start by adding your first category'
        icon={<LocalOffer />}
        title='No Categories Found'
      />
    );
  }

  return (
    <>
      {isRefetching && <ListSkeleton count={1} />}

      {categories.map(({ description, id, image, name }) => (
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
              disabled={isDeleting || isRefetching}
              edge='end'
              href={paths.dashboard.categories.id.edit.to(id.toString())}
              LinkComponent={Link}
            >
              <Edit />
            </IconButton>

            <ConfirmActionButton
              confirmButtonColor='error'
              confirmButtonText='Delete'
              description={`Are you sure you want to delete the category "${name}"? `}
              maxWidth='sm'
              onConfirm={() => deleteMutation(id)}
              title={`Delete ${name}`}
            >
              <IconButton disabled={isRefetching} edge='end'>
                <Delete />
              </IconButton>
            </ConfirmActionButton>
          </Box>
        </ListItem>
      ))}
    </>
  );
}

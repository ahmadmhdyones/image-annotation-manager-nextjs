'use client';

import { toast } from 'react-hot-toast';

import { ImageList } from '@mui/material';
import { Collections } from '@mui/icons-material';

import EmptyContent from '@/components/ui/empty-content';
import ErrorContent from '@/components/ui/error-content';

import { IImage } from '@/types/models/image.types';

import ListItem from './list-item';
import ListSkeleton from './list-skeleton';
import useGetImages from './hooks/use-get-images';
import ListItemSkeleton from './list-item-skeleton';
import { useDeleteImage } from './hooks/use-delete-image';
import useInvalidateImages from './hooks/use-invalidate-images';

// ----------------------------------------------------------------------

export default function ListContent({ initialData }: { initialData?: IImage[] }) {
  const { data: images = [], error, isError, isFetching, isLoading, isRefetching } = useGetImages(initialData);

  const { error: deleteError, isError: isDeleteError, isSuccess: isDeleted, mutate: deleteMutation } = useDeleteImage();

  // Revalidate images when deletion is successful or there is an error
  useInvalidateImages({ shouldInvalidate: isDeleted || isDeleteError });

  if (isError) return <ErrorContent error={error} />;
  if (isLoading || isFetching) return <ListSkeleton />;
  if (isDeleteError) {
    toast.error('Something went wrong while deleting the image, please reload the page.');
    return <ErrorContent error={deleteError} />;
  }

  if (images.length === 0) {
    return (
      <EmptyContent description='Start by uploading your first image' icon={<Collections />} title='No Images Found' />
    );
  }

  return (
    <ImageList
      gap={16}
      sx={{
        '& .MuiImageListItem-root': { height: '100% !important' },
        'display': { md: 'grid', xs: 'flex' },
        'flexDirection': { md: 'row', xs: 'column' },
        'gridTemplateColumns': {
          md: 'repeat(3, 1fr) !important',
          sm: 'repeat(2, 1fr) !important',
          xs: 'repeat(1, 1fr) !important',
        },
      }}
      variant='quilted'
    >
      {isRefetching && <ListItemSkeleton />}

      {images.map(image => (
        <ListItem image={image} isRefetching={isRefetching} key={image.id} onDelete={deleteMutation} />
      ))}
    </ImageList>
  );
}

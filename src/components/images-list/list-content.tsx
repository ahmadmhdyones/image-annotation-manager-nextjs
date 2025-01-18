'use client';

import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

import { Draw, Delete, Collections } from '@mui/icons-material';
import { Box, Chip, Stack, ImageList, Typography, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';

import EmptyContent from '@/components/ui/empty-content';
import ErrorContent from '@/components/ui/error-content';
import ConfirmActionButton from '@/components/ui/confirm-action-button';

import { IImage } from '@/types/models/image.types';

import { DEFAULT_BLUR_DATA_URL } from '@/configs/global.config';

import { paths } from '@/helpers/map-routes';

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
        <ImageListItem key={image.id}>
          <Box sx={{ aspectRatio: '1/1', display: 'block', position: 'relative' }}>
            <Image
              alt={image.name}
              blurDataURL={DEFAULT_BLUR_DATA_URL}
              fill
              loading='lazy'
              placeholder='blur'
              sizes={`
                (max-width: 600px) calc(100vw - 32px),
                (max-width: 900px) calc(50vw - 24px),
                calc(33vw - 22px)
              `}
              src={image.url}
              style={{
                backgroundColor: 'rgba(0,0,0,0.02)',
                borderRadius: '8px 8px 0 0',
                objectFit: 'cover',
              }}
            />
          </Box>
          <ImageListItemBar
            actionIcon={
              <Box display='flex' justifyContent='flex-end' sx={{ gap: 0.5, height: '100%', py: 1.5 }}>
                <IconButton
                  disabled={isRefetching}
                  href={paths.dashboard.images.id.canvas.to(image.id.toString())}
                  LinkComponent={Link}
                  size='small'
                  sx={{ marginTop: 'auto' }}
                >
                  <Draw />
                </IconButton>

                <ConfirmActionButton
                  confirmButtonColor='error'
                  confirmButtonText='Delete'
                  description={`Are you sure you want to delete "${image.name}"?`}
                  onConfirm={() => deleteMutation(image.id)}
                  title='Delete Image'
                >
                  <IconButton disabled={isRefetching} size='small' sx={{ marginTop: 'auto' }}>
                    <Delete />
                  </IconButton>
                </ConfirmActionButton>
              </Box>
            }
            position='below'
            subtitle={
              <Stack alignItems='center' direction='row' spacing={1}>
                <Typography component='span' variant='caption'>
                  {[image.metadata?.resolution, image.metadata?.format, image.metadata?.size]
                    .filter(Boolean)
                    .join(' • ')}
                </Typography>
                <Chip
                  clickable
                  component={Link}
                  href={`/dashboard/categories/${image.categoryId}`}
                  label={`Category ${image.categoryId}`}
                  size='small'
                  sx={{ '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' } }}
                />
              </Stack>
            }
            sx={{ justifyContent: 'space-between' }}
            title={
              <Typography
                component='span'
                noWrap
                sx={{
                  display: 'inline-block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={image.name}
              >
                {image.name}
              </Typography>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

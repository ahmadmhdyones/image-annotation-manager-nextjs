'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { Draw } from '@mui/icons-material';
import { Box, Chip, Stack, ImageList, Typography, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';

import { IImage } from '@/types/models/image.types';

import { paths } from '@/helpers/map-routes';
import { imageAPI } from '@/helpers/api/resources/image';
import { queryKeys } from '@/helpers/react-query/query-keys.enum';

import ImagesListSkeleton from './list-skeleton';

// ----------------------------------------------------------------------

export default function ListContent({ initialData }: { initialData: IImage[] }) {
  const { data: images = [], isLoading } = useQuery({
    initialData,
    queryFn: () => imageAPI.getMany(),
    queryKey: [queryKeys.images()],
  });

  if (isLoading) {
    return <ImagesListSkeleton />;
  }

  if (images.length === 0) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography color='text.secondary' variant='body1'>
          No images found
        </Typography>
      </Box>
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
      {images.map(image => (
        <ImageListItem key={image.id}>
          <Box sx={{ aspectRatio: '1/1', display: 'block', position: 'relative' }}>
            <Image
              alt={image.name}
              blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPENDPzE2O0FBNjpLPS1yWEk6T3RBRVlKR05PS0ZaVktPWXBJR0f/2wBDARUXFx4aHR4eHUZDOzNGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkb/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
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
              <Box display='flex' justifyContent='flex-end' sx={{ height: '100%', py: 1.5 }}>
                <IconButton
                  href={paths.dashboard.images.id.canvas.to(image.id.toString())}
                  LinkComponent={Link}
                  size='small'
                  sx={{ marginTop: 'auto' }}
                >
                  <Draw />
                </IconButton>
              </Box>
            }
            position='below'
            subtitle={
              <Stack alignItems='center' direction='row' spacing={1}>
                <Typography component='span' variant='caption'>
                  {`${image.metadata.resolution} • ${image.metadata.format} • ${image.metadata.size}`}
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

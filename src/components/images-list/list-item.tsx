import Link from 'next/link';
import Image from 'next/image';

import { Draw, Delete } from '@mui/icons-material';
import { Box, Chip, Stack, Typography, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';

import ConfirmActionButton from '@/components/ui/confirm-action-button';

import { IImage } from '@/types/models/image.types';

import { DEFAULT_BLUR_DATA_URL } from '@/configs/global.config';

import { paths } from '@/helpers/map-routes';

import AnnotationCountButton from './annotation-count-button';

// ----------------------------------------------------------------------

interface Props {
  image: IImage;
  isRefetching: boolean;
  onDelete: (imageId: number) => void;
}

export default function ListItem({ image, isRefetching, onDelete }: Props) {
  return (
    <ImageListItem>
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
          <Box
            display='flex'
            flexDirection={{ md: 'row', xs: 'column' }}
            justifyContent='flex-end'
            sx={{ gap: 0.5, height: '100%', pt: { md: 1.5, xs: 1 } }}
          >
            <AnnotationCountButton disabled={isRefetching} imageId={image.id} />

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
              onConfirm={() => onDelete(image.id)}
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
          <Stack alignItems='center' direction='row' spacing={1} sx={{ marginTop: 'auto' }}>
            <Typography component='span' variant='caption'>
              {[image.metadata?.resolution, image.metadata?.format, image.metadata?.size].filter(Boolean).join(' • ')}
            </Typography>
            <Chip
              label={`Category ${image.categoryId}`}
              size='small'
              sx={{ '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' } }}
            />
          </Stack>
        }
        sx={{
          '& .MuiImageListItemBar-titleWrap': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            pb: 0,
          },
          'justifyContent': 'space-between',
        }}
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
  );
}

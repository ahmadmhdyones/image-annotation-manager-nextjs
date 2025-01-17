import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { PageContainer } from '@toolpad/core/PageContainer';

import { Draw } from '@mui/icons-material';
import { Box, Chip, Stack, ImageList, Typography, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';

import ImageFilterForm from '@/components/image-filter-form';

import { paths } from '@/helpers/map-routes';
import { imageAPI } from '@/helpers/api/resources/image';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Images',
};

export default async function ImagesListPage() {
  const images = await imageAPI.getMany();

  return (
    <PageContainer id={paths.dashboard.images.root.id}>
      <Box sx={{ height: '100%', width: '100%' }}>
        <ImageFilterForm />

        {images.length > 0 ? (
          <ImageList cols={2} gap={16} variant='masonry'>
            {images.map(image => (
              <ImageListItem key={image.id}>
                <Link href={paths.dashboard.images.id.canvas.to(image.id.toString())}>
                  <Image
                    alt={image.name}
                    height='0'
                    loading='lazy'
                    sizes='100vw'
                    src={image.url}
                    style={{
                      borderRadius: 8,
                      height: 'auto',
                      width: '100%',
                    }}
                    width='0'
                  />
                </Link>
                <ImageListItemBar
                  actionIcon={
                    <Box display='flex' justifyContent='flex-end' sx={{ height: '100%' }}>
                      <IconButton
                        href={paths.dashboard.images.id.canvas.to(image.id.toString())}
                        LinkComponent={Link}
                        size='small'
                        sx={{
                          marginTop: 'auto',
                        }}
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
                        sx={{
                          '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                          },
                        }}
                      />
                    </Stack>
                  }
                  title={image.name}
                />
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography color='text.secondary' variant='body1'>
              No images found
            </Typography>
          </Box>
        )}
      </Box>
    </PageContainer>
  );
}

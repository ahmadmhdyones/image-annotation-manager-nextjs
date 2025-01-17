import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { PageContainer } from '@toolpad/core/PageContainer';

import { Draw } from '@mui/icons-material';
import { Box, ImageList, Typography, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';

import { paths } from '@/helpers/map-routes';
import { imageAPI } from '@/helpers/api/resources/image';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Images',
};

export default async function ImagesListPage() {
  const images = await imageAPI.getMany();
  // const images = [];

  return (
    <PageContainer id={paths.dashboard.images.root.id}>
      <Box sx={{ height: '100%', width: '100%' }}>
        {/* Search and filters will go here in a separate component */}

        {images.length > 0 ? (
          <ImageList gap={16} variant='masonry'>
            {images.map(image => (
              <ImageListItem key={image.id}>
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
                <ImageListItemBar
                  actionIcon={
                    <IconButton href={paths.dashboard.images.id.canvas.to(image.id.toString())} LinkComponent={Link}>
                      <Draw />
                    </IconButton>
                  }
                  position='below'
                  subtitle={
                    <Typography component='span' variant='caption'>
                      {`${image.metadata.resolution} • ${image.metadata.format} • ${image.metadata.size}`}
                    </Typography>
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

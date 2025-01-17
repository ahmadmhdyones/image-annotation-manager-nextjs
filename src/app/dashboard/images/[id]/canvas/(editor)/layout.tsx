import { Box, Chip, Stack, Typography } from '@mui/material';

import { paths } from '@/helpers/map-routes';
import { RouteParams } from '@/helpers/map-params';
import { imageAPI } from '@/helpers/api/resources/image';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }: { params: Promise<{ [RouteParams.ID]: string }> }) {
  const { id } = await params;
  const image = await imageAPI.getOne(Number(id));

  return {
    title: `Canvas: ${image.name}`,
  };
}

export default async function CanvasLayout({
  children,
  params,
}: {
  params: Promise<{ [RouteParams.ID]: string }>;
  children: Readonly<React.ReactNode>;
}) {
  const { id } = await params;
  const image = await imageAPI.getOne(Number(id));

  return (
    <Box
      id={`${paths.dashboard.images.id.canvas.id}-layout`}
      sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      <Box
        component='header'
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          px: 2,
          py: { md: 0.5, xs: 1 },
        }}
      >
        <Stack spacing={1}>
          <Box
            sx={{
              alignItems: { md: 'center', xs: 'flex-start' },
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              gap: { md: 0, xs: 1 },
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Stack
              alignItems={{ md: 'center', xs: 'flex-start' }}
              direction='row'
              spacing={1}
              sx={{ flex: 1, flexWrap: 'wrap', maxWidth: '90%', minWidth: 0, paddingRight: { md: 1 } }}
            >
              <Typography
                component='h6'
                sx={{
                  display: 'block',
                  fontSize: { md: '1.25rem', xs: '1rem' },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                }}
                title={image.name}
                variant='h6'
              >
                {image.name}
              </Typography>
            </Stack>

            <Stack
              alignItems={'center'}
              direction='row'
              justifyContent={{ md: 'flex-end', xs: 'space-between' }}
              spacing={1}
              sx={{ width: { md: 'fit-content', xs: '100%' } }}
            >
              <Chip label={`Category ${image.categoryId}`} size='small' />
              <Typography
                sx={{ alignSelf: 'center', color: 'text.secondary', wordBreak: 'break-word' }}
                variant='caption'
              >
                {`${image.metadata.resolution} • ${image.metadata.format} • ${image.metadata.size}`}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ flex: 1, position: 'relative' }}>{children}</Box>
    </Box>
  );
}

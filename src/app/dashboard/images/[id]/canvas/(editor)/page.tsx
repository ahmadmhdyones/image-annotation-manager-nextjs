import { Box } from '@mui/material';

import CanvasEditor from '@/components/canvas';

import { RouteParams } from '@/helpers/map-params';
import { imageAPI } from '@/helpers/api/resources/image';

// ----------------------------------------------------------------------

export default async function ImagesCanvasPage({ params }: { params: Promise<{ [RouteParams.ID]: string }> }) {
  const { id } = await params;

  const image = await imageAPI.getOne(Number(id));

  return (
    /* ------------------------- <Image Canvas Editor> ------------------------ */
    <Box component='section' sx={{ height: '100%', width: '100%' }}>
      <CanvasEditor image={image} />
    </Box>
    /* ------------------------- </Image Canvas Editor> ------------------------ */
  );
}

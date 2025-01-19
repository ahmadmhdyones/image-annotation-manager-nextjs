import { ImageList } from '@mui/material';

import ListItemSkeleton from './list-item-skeleton';

// ----------------------------------------------------------------------

export default function ListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <ImageList
      gap={16}
      sx={{
        '& .MuiImageListItem-root': { height: '100% !important' },
        'gridTemplateColumns': {
          md: 'repeat(3, 1fr) !important',
          sm: 'repeat(2, 1fr) !important',
          xs: 'repeat(1, 1fr) !important',
        },
      }}
      variant='quilted'
    >
      {[...Array(count)].map((_, index) => (
        <ListItemSkeleton key={index} />
      ))}
    </ImageList>
  );
}

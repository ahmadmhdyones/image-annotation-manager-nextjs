import { Stack, Skeleton, ImageListItem, ImageListItemBar } from '@mui/material';

// ----------------------------------------------------------------------

export default function ListItemSkeleton() {
  return (
    <ImageListItem
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Skeleton
        animation='wave'
        sx={{
          aspectRatio: '1/1',
          borderRadius: 1,
          height: 'auto',
          width: '100%',
        }}
        variant='rectangular'
      />
      <ImageListItemBar
        position='below'
        subtitle={
          <Stack alignItems='center' direction='row' spacing={1}>
            <Skeleton animation='wave' width={120} />
            <Skeleton animation='wave' width={80} />
          </Stack>
        }
        sx={{ pt: 1 }}
        title={<Skeleton animation='wave' width={160} />}
      />
    </ImageListItem>
  );
}

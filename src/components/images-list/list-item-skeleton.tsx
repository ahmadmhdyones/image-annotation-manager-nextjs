import { Stack, Skeleton, ImageListItem, ImageListItemBar } from '@mui/material';

// ----------------------------------------------------------------------

export default function ListItemSkeleton() {
  return (
    <ImageListItem>
      <Skeleton animation='wave' height={200} sx={{ borderRadius: 1 }} variant='rectangular' width='100%' />
      <ImageListItemBar
        position='below'
        subtitle={
          <Stack alignItems='center' direction='row' spacing={1}>
            <Skeleton animation='wave' width={120} />
            <Skeleton animation='wave' width={80} />
          </Stack>
        }
        title={<Skeleton animation='wave' width={160} />}
      />
    </ImageListItem>
  );
}

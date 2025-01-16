import { Box, ListItem, Skeleton, ListItemText, ListItemAvatar } from '@mui/material';

// ----------------------------------------------------------------------

export default function ListItemSkeleton() {
  return (
    <ListItem>
      <ListItemAvatar sx={{ marginBottom: 'auto' }}>
        <Skeleton height={40} variant='circular' width={40} />
      </ListItemAvatar>

      <ListItemText
        primary={<Skeleton variant='text' width='40%' />}
        secondary={<Skeleton variant='text' width='70%' />}
      />

      <Box sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' }, gap: { md: 2, xs: 1 } }}>
        <Skeleton height={40} variant='circular' width={40} />
        <Skeleton height={40} variant='circular' width={40} />
      </Box>
    </ListItem>
  );
}

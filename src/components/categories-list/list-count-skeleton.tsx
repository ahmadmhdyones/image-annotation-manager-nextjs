import { Box, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function ListCountSkeleton() {
  return (
    <Box sx={{ display: 'inline-block' }}>
      <Skeleton variant='text' width={30} />
    </Box>
  );
}

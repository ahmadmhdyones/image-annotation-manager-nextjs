'use client';

import { Box } from '@mui/material';

import ListContent from './list-content';

// ----------------------------------------------------------------------

export default function ListContainer() {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <ListContent />
    </Box>
  );
}

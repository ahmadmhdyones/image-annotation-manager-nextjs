import { Theme, SxProps } from '@mui/material';

// ----------------------------------------------------------------------

export const cardStyle: SxProps<Theme> = {
  '&:hover': {
    backgroundColor: 'action.hover',
    transform: 'translateY(-2px)',
  },
  'border': '1px solid',
  'borderColor': 'divider',
  'boxShadow': 'none',
  'height': '100%',
  'transition': 'all 0.2s ease-in-out',
};

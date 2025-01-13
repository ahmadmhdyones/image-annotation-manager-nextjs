import { Theme, alpha, Components } from '@mui/material/styles';

import { gray } from '../theme-primitives';

// ----------------------------------------------------------------------

export const feedbackCustomizations: Components<Theme> = {
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: `1px solid ${alpha(gray[300], 0.9)}`,
        borderRadius: 10,
        color: theme.palette.text.primary,
        ...theme.applyStyles('dark', {
          border: `1px solid ${alpha(gray[700], 0.9)}`,
        }),
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiDialog-paper': {
          border: '1px solid',
          borderColor: theme.palette.divider,
          borderRadius: '10px',
        },
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: gray[200],
        borderRadius: 8,
        height: 8,
        ...theme.applyStyles('dark', {
          backgroundColor: gray[800],
        }),
      }),
    },
  },
};

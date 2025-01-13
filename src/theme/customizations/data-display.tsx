import { chipClasses } from '@mui/material/Chip';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { typographyClasses } from '@mui/material/Typography';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { iconButtonClasses } from '@mui/material/IconButton';
import { Theme, alpha, Components } from '@mui/material/styles';

import { red, gray, green } from '../theme-primitives';

// ----------------------------------------------------------------------

export const dataDisplayCustomizations: Components<Theme> = {
  MuiChip: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${chipClasses.label}`]: {
          fontWeight: 600,
        },
        border: '1px solid',
        borderRadius: '999px',
        variants: [
          {
            props: {
              color: 'default',
            },
            style: {
              [`& .${chipClasses.icon}`]: {
                color: gray[500],
              },
              [`& .${chipClasses.label}`]: {
                color: gray[500],
              },
              backgroundColor: gray[100],
              borderColor: gray[200],
              ...theme.applyStyles('dark', {
                [`& .${chipClasses.icon}`]: {
                  color: gray[300],
                },
                [`& .${chipClasses.label}`]: {
                  color: gray[300],
                },
                backgroundColor: gray[800],
                borderColor: gray[700],
              }),
            },
          },
          {
            props: {
              color: 'success',
            },
            style: {
              [`& .${chipClasses.icon}`]: {
                color: green[500],
              },
              [`& .${chipClasses.label}`]: {
                color: green[500],
              },
              backgroundColor: green[50],
              borderColor: green[200],
              ...theme.applyStyles('dark', {
                [`& .${chipClasses.icon}`]: {
                  color: green[300],
                },
                [`& .${chipClasses.label}`]: {
                  color: green[300],
                },
                backgroundColor: green[900],
                borderColor: green[800],
              }),
            },
          },
          {
            props: {
              color: 'error',
            },
            style: {
              [`& .${chipClasses.icon}`]: {
                color: red[500],
              },
              [`& .${chipClasses.label}`]: {
                color: red[500],
              },
              backgroundColor: red[50],
              borderColor: red[100],
              ...theme.applyStyles('dark', {
                [`& .${chipClasses.icon}`]: {
                  color: red[300],
                },
                [`& .${chipClasses.label}`]: {
                  color: red[200],
                },
                backgroundColor: red[900],
                borderColor: red[800],
              }),
            },
          },
          {
            props: { size: 'small' },
            style: {
              [`& .${chipClasses.label}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
              [`& .${svgIconClasses.root}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
              maxHeight: 20,
            },
          },
          {
            props: { size: 'medium' },
            style: {
              [`& .${chipClasses.label}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
            },
          },
        ],
      }),
    },
  },
  MuiIcon: {
    defaultProps: {
      fontSize: 'small',
    },
    styleOverrides: {
      root: {
        variants: [
          {
            props: {
              fontSize: 'small',
            },
            style: {
              fontSize: '1rem',
            },
          },
        ],
      },
    },
  },
  MuiList: {
    styleOverrides: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        padding: '8px',
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${buttonBaseClasses.root}`]: {
          '&:focus-visible': {
            backgroundColor: 'transparent',
          },
          '&.Mui-selected': {
            '&:focus-visible': {
              backgroundColor: alpha(theme.palette.action.selected, 0.3),
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.action.selected, 0.5),
            },
            [`& .${svgIconClasses.root}`]: {
              color: theme.palette.text.primary,
            },
            'backgroundColor': alpha(theme.palette.action.selected, 0.3),
            'opacity': 1,
          },
          'borderRadius': theme.shape.borderRadius,
          'display': 'flex',
          'gap': 8,
          'opacity': 0.7,
          'padding': '2px 8px',
        },
        [`& .${svgIconClasses.root}`]: {
          color: theme.palette.text.secondary,
          height: '1rem',
          width: '1rem',
        },
        [`& .${typographyClasses.root}`]: {
          fontWeight: 500,
        },
      }),
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        justifyContent: 'center',
        minWidth: 0,
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: ({ theme }) => ({
        fontSize: theme.typography.body2.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.body2.lineHeight,
      }),
      secondary: ({ theme }) => ({
        fontSize: theme.typography.caption.fontSize,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiTablePagination: {
    styleOverrides: {
      actions: {
        [`& .${iconButtonClasses.root}`]: {
          height: 36,
          minWidth: 0,
          width: 36,
        },
        display: 'flex',
        gap: 8,
        marginRight: 6,
      },
    },
  },
};

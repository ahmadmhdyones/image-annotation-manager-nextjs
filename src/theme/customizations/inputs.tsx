import * as React from 'react';

import { svgIconClasses } from '@mui/material/SvgIcon';
import { alpha, Theme, Components } from '@mui/material/styles';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { toggleButtonClasses } from '@mui/material/ToggleButton';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';

import { gray, brand } from '../theme-primitives';

// ----------------------------------------------------------------------

export const inputsCustomizations: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        boxShadow: 'none',
        textTransform: 'none',
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              height: '2.25rem',
              padding: '8px 12px',
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              height: '2.5rem', // 40px
            },
          },
          {
            props: {
              color: 'primary',
              variant: 'contained',
            },
            style: {
              '&:active': {
                backgroundColor: gray[800],
              },
              '&:hover': {
                backgroundColor: gray[700],
                backgroundImage: 'none',
                boxShadow: 'none',
              },
              'backgroundColor': gray[900],
              'backgroundImage': `linear-gradient(to bottom, ${gray[700]}, ${gray[800]})`,
              'border': `1px solid ${gray[700]}`,
              'boxShadow': `inset 0 1px 0 ${gray[600]}, inset 0 -1px 0 1px hsl(220, 0%, 0%)`,
              'color': 'white',
              ...theme.applyStyles('dark', {
                '&:active': {
                  backgroundColor: gray[400],
                },
                '&:hover': {
                  backgroundColor: gray[300],
                  backgroundImage: 'none',
                  boxShadow: 'none',
                },
                'backgroundColor': gray[50],
                'backgroundImage': `linear-gradient(to bottom, ${gray[100]}, ${gray[50]})`,
                'border': `1px solid ${gray[50]}`,
                'boxShadow': 'inset 0 -1px 0  hsl(220, 30%, 80%)',
                'color': 'black',
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'contained',
            },
            style: {
              '&:active': {
                backgroundColor: brand[700],
                backgroundImage: 'none',
              },
              '&:hover': {
                backgroundColor: brand[700],
                boxShadow: 'none',
              },
              'backgroundColor': brand[300],
              'backgroundImage': `linear-gradient(to bottom, ${alpha(brand[400], 0.8)}, ${brand[500]})`,
              'border': `1px solid ${brand[500]}`,
              'boxShadow': `inset 0 2px 0 ${alpha(brand[200], 0.2)}, inset 0 -2px 0 ${alpha(brand[700], 0.4)}`,
              'color': 'white',
            },
          },
          {
            props: {
              variant: 'outlined',
            },
            style: {
              '&:active': {
                backgroundColor: gray[200],
              },
              '&:hover': {
                backgroundColor: gray[100],
                borderColor: gray[300],
              },
              'backgroundColor': alpha(gray[50], 0.3),
              'border': '1px solid',
              'borderColor': gray[200],
              'color': theme.palette.text.primary,
              ...theme.applyStyles('dark', {
                '&:active': {
                  backgroundColor: gray[900],
                },
                '&:hover': {
                  backgroundColor: gray[900],
                  borderColor: gray[600],
                },

                'backgroundColor': gray[800],
                'borderColor': gray[700],
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'outlined',
            },
            style: {
              '&:active': {
                backgroundColor: alpha(brand[200], 0.7),
              },
              '&:hover': {
                backgroundColor: brand[100],
                borderColor: brand[400],
              },
              'backgroundColor': brand[50],
              'border': '1px solid',
              'borderColor': brand[200],
              'color': brand[700],
              ...theme.applyStyles('dark', {
                '&:active': {
                  backgroundColor: alpha(brand[900], 0.5),
                },
                '&:hover': {
                  backgroundColor: alpha(brand[900], 0.6),
                  borderColor: brand[700],
                },
                'backgroundColor': alpha(brand[900], 0.3),
                'border': '1px solid',
                'borderColor': brand[900],
                'color': brand[50],
              }),
            },
          },
          {
            props: {
              variant: 'text',
            },
            style: {
              '&:active': {
                backgroundColor: gray[200],
              },
              '&:hover': {
                backgroundColor: gray[100],
              },
              'color': gray[600],
              ...theme.applyStyles('dark', {
                '&:active': {
                  backgroundColor: alpha(gray[700], 0.7),
                },
                '&:hover': {
                  backgroundColor: gray[700],
                },
                'color': gray[50],
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'text',
            },
            style: {
              '&:active': {
                backgroundColor: alpha(brand[200], 0.7),
              },
              '&:hover': {
                backgroundColor: alpha(brand[100], 0.5),
              },
              'color': brand[700],
              ...theme.applyStyles('dark', {
                '&:active': {
                  backgroundColor: alpha(brand[900], 0.3),
                },
                '&:hover': {
                  backgroundColor: alpha(brand[900], 0.5),
                },
                'color': brand[100],
              }),
            },
          },
        ],
      }),
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
      disableTouchRipple: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        '&:focus-visible': {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: '2px',
        },
        'boxSizing': 'border-box',
        'transition': 'all 100ms ease-in',
      }),
    },
  },
  MuiCheckbox: {
    defaultProps: {
      checkedIcon: <CheckRoundedIcon sx={{ height: 14, width: 14 }} />,
      disableRipple: true,
      icon: <CheckBoxOutlineBlankRoundedIcon sx={{ color: 'hsla(210, 0%, 0%, 0.0)' }} />,
      indeterminateIcon: <RemoveRoundedIcon sx={{ height: 14, width: 14 }} />,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        '&:hover': {
          borderColor: brand[300],
        },
        '&.Mui-checked': {
          '&:hover': {
            backgroundColor: brand[600],
          },
          'backgroundColor': brand[500],
          'borderColor': brand[500],
          'boxShadow': `none`,
          'color': 'white',
        },
        '&.Mui-focusVisible': {
          borderColor: brand[400],
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '2px',
        },
        'backgroundColor': alpha(gray[100], 0.4),
        'border': '1px solid ',
        'borderColor': alpha(gray[300], 0.8),
        'borderRadius': 5,
        'boxShadow': '0 0 0 1.5px hsla(210, 0%, 0%, 0.04) inset',
        'height': 16,
        'margin': 10,
        'transition': 'border-color, background-color, 120ms ease-in',
        'width': 16,
        ...theme.applyStyles('dark', {
          '&:hover': {
            borderColor: brand[300],
          },
          '&.Mui-focusVisible': {
            borderColor: brand[400],
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: '2px',
          },
          'backgroundColor': alpha(gray[900], 0.8),
          'borderColor': alpha(gray[700], 0.8),
          'boxShadow': '0 0 0 1.5px hsl(210, 0%, 0%) inset',
        }),
      }),
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        marginBottom: 8,
        typography: theme.typography.caption,
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:active': {
          backgroundColor: gray[200],
        },
        '&:hover': {
          backgroundColor: gray[100],
          borderColor: gray[300],
        },
        'backgroundColor': alpha(gray[50], 0.3),
        'border': '1px solid ',
        'borderColor': gray[200],
        'borderRadius': theme.shape.borderRadius,
        'boxShadow': 'none',
        'color': theme.palette.text.primary,
        'fontWeight': theme.typography.fontWeightMedium,
        'letterSpacing': 0,
        'textTransform': 'none',
        ...theme.applyStyles('dark', {
          '&:active': {
            backgroundColor: gray[900],
          },
          '&:hover': {
            backgroundColor: gray[900],
            borderColor: gray[600],
          },
          'backgroundColor': gray[800],
          'borderColor': gray[700],
        }),
        'variants': [
          {
            props: {
              size: 'small',
            },
            style: {
              [`& .${svgIconClasses.root}`]: { fontSize: '1rem' },
              height: '2.25rem',
              padding: '0.25rem',
              width: '2.25rem',
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              height: '2.5rem',
              width: '2.5rem',
            },
          },
        ],
      }),
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.grey[500],
        ...theme.applyStyles('dark', {
          color: theme.palette.grey[400],
        }),
      }),
    },
  },
  MuiInputBase: {
    styleOverrides: {
      input: {
        '&::placeholder': {
          color: gray[500],
          opacity: 0.7,
        },
      },
      root: {
        border: 'none',
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        [`&.${outlinedInputClasses.focused}`]: {
          transform: 'translate(4px, -12px) scale(0.75)',
        },
        transform: 'translate(4px, -11px) scale(0.75)',
      },
    },
  },
  // @ts-expect-error TODO: MuiLoadingButton is not present in the default `theme`
  MuiLoadingButton: {
    styleOverrides: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      root: ({ theme }) => ({
        '& .MuiLoadingButton-loadingIndicator': {
          color: gray[400],
          ...theme.applyStyles('dark', {
            color: gray[600],
          }),
        },
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        padding: 0,
      },
      notchedOutline: {
        border: 'none',
      },
      root: ({ theme }) => ({
        '&:hover': {
          borderColor: gray[400],
        },
        [`&.${outlinedInputClasses.focused}`]: {
          borderColor: brand[400],
          outline: `2px solid ${alpha(brand[500], 0.5)}`,
        },
        'backgroundColor': theme.palette.background.default,
        'border': `1px solid ${theme.palette.divider}`,
        'borderRadius': theme.shape.borderRadius,
        'color': theme.palette.text.primary,
        'padding': '8px 12px',
        'transition': 'border 120ms ease-in',
        ...theme.applyStyles('dark', {
          '&:hover': {
            borderColor: gray[500],
          },
        }),
        'variants': [
          {
            props: {
              size: 'small',
            },
            style: {
              height: '2.25rem',
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              height: '2.5rem',
            },
          },
        ],
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: '10px',
        fontWeight: 500,
        padding: '12px 16px',
        textTransform: 'none',
        ...theme.applyStyles('dark', {
          [`&.${toggleButtonClasses.selected}`]: {
            color: brand[300],
          },
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
          color: gray[400],
        }),
      }),
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${toggleButtonGroupClasses.selected}`]: {
          color: brand[500],
        },
        borderRadius: '10px',
        boxShadow: `0 4px 16px ${alpha(gray[400], 0.2)}`,
        ...theme.applyStyles('dark', {
          [`& .${toggleButtonGroupClasses.selected}`]: {
            color: '#fff',
          },
          boxShadow: `0 4px 16px ${alpha(brand[700], 0.5)}`,
        }),
      }),
    },
  },
};

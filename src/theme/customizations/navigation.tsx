import * as React from 'react';

import { tabClasses } from '@mui/material/Tab';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { selectClasses } from '@mui/material/Select';
import { dividerClasses } from '@mui/material/Divider';
import { menuItemClasses } from '@mui/material/MenuItem';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { Theme, alpha, Components } from '@mui/material/styles';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';

import { gray, brand } from '../theme-primitives';

// ----------------------------------------------------------------------

export const navigationCustomizations: Components<Theme> = {
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
      }),
    },
  },
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        '&::before': {
          backgroundColor: theme.palette.text.secondary,
          bottom: 0,
          content: '""',
          height: '1px',
          left: 0,
          opacity: 0.3,
          position: 'absolute',
          transition: 'width 0.3s ease, opacity 0.3s ease',
          width: '100%',
        },
        '&:focus-visible': {
          borderRadius: '2px',
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '4px',
        },
        '&:hover::before': {
          width: 0,
        },
        'color': theme.palette.text.primary,
        'fontWeight': 500,
        'position': 'relative',
        'textDecoration': 'none',
        'width': 'fit-content',
      }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      list: {
        [`&.${dividerClasses.root}`]: {
          margin: '0 -8px',
        },
        gap: '0px',
      },
      paper: ({ theme }) => ({
        [`& .${buttonBaseClasses.root}`]: {
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
        },
        background: 'hsl(0, 0%, 100%)',
        backgroundImage: 'none',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        boxShadow: 'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
        marginTop: '4px',
        ...theme.applyStyles('dark', {
          background: gray[900],
          boxShadow: 'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
        }),
      }),
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`&.${menuItemClasses.focusVisible}`]: {
          backgroundColor: 'transparent',
        },
        [`&.${menuItemClasses.selected}`]: {
          [`&.${menuItemClasses.focusVisible}`]: {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
        },
        borderRadius: theme.shape.borderRadius,
        padding: '6px 8px',
      }),
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-selected': {
          backgroundColor: theme.palette.grey[900],
          color: 'white',
        },
        ...theme.applyStyles('dark', {
          '&.Mui-selected': {
            backgroundColor: theme.palette.grey[50],
            color: 'black',
          },
        }),
      }),
    },
  },
  MuiSelect: {
    defaultProps: {
      IconComponent: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
        <UnfoldMoreRoundedIcon fontSize='small' {...props} ref={ref} />
      )),
    },
    styleOverrides: {
      root: ({ theme }) => ({
        '&:before, &:after': {
          display: 'none',
        },
        '&:hover': {
          backgroundColor: theme.palette.background.paper,
          borderColor: gray[300],
          boxShadow: 'none',
        },
        [`&.${selectClasses.focused}`]: {
          borderColor: gray[400],
          outlineOffset: 0,
        },
        'backgroundColor': theme.palette.background.paper,
        'border': '1px solid',
        'borderColor': gray[200],
        'borderRadius': theme.shape.borderRadius,
        'boxShadow': `inset 0 1px 0 1px hsla(220, 0%, 100%, 0.6), inset 0 -1px 0 1px hsla(220, 35%, 90%, 0.5)`,

        ...theme.applyStyles('dark', {
          '&:before, &:after': {
            display: 'none',
          },
          '&:hover': {
            backgroundColor: theme.palette.background.paper,
            borderColor: alpha(gray[700], 0.7),
            boxShadow: 'none',
          },
          [`&.${selectClasses.focused}`]: {
            borderColor: gray[900],
            outlineOffset: 0,
          },
          'backgroundColor': theme.palette.background.paper,
          'borderColor': gray[700],
          'borderRadius': theme.shape.borderRadius,
          'boxShadow': `inset 0 1px 0 1px ${alpha(gray[700], 0.15)}, inset 0 -1px 0 1px hsla(220, 0%, 0%, 0.7)`,
        }),
      }),
      select: ({ theme }) => ({
        alignItems: 'center',
        display: 'flex',
        ...theme.applyStyles('dark', {
          '&:focus-visible': {
            backgroundColor: gray[900],
          },
          'alignItems': 'center',
          'display': 'flex',
        }),
      }),
    },
  },
  MuiStepConnector: {
    styleOverrides: {
      line: ({ theme }) => ({
        borderColor: theme.palette.divider,
        borderRadius: '99px',
        borderTop: '1px solid',
        flex: 1,
      }),
    },
  },
  MuiStepIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-active': {
          border: 'none',
          color: theme.palette.primary.main,
        },
        '&.Mui-completed': {
          border: 'none',
          color: theme.palette.success.main,
        },
        '& text': {
          display: 'none',
        },
        'border': `1px solid ${gray[400]}`,
        'borderRadius': '50%',
        'color': 'transparent',
        'height': 12,
        'width': 12,
        ...theme.applyStyles('dark', {
          '&.Mui-active': {
            border: 'none',
            color: theme.palette.primary.light,
          },
          '&.Mui-completed': {
            border: 'none',
            color: theme.palette.success.light,
          },
          'border': `1px solid ${gray[700]}`,
        }),
        'variants': [
          {
            props: { completed: true },
            style: {
              height: 12,
              width: 12,
            },
          },
        ],
      }),
    },
  },
  MuiStepLabel: {
    styleOverrides: {
      label: ({ theme }) => ({
        '&.Mui-completed': {
          opacity: 0.6,
          ...theme.applyStyles('dark', { opacity: 0.5 }),
        },
      }),
    },
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        ':hover': {
          backgroundColor: gray[100],
          borderColor: gray[200],
          color: theme.palette.text.primary,
        },
        [`&.${tabClasses.selected}`]: {
          color: gray[900],
        },
        'border': '1px solid',
        'borderColor': 'transparent',
        'borderRadius': theme.shape.borderRadius,
        'color': theme.palette.text.secondary,
        'marginBottom': '8px',
        'minHeight': 'fit-content',
        'minWidth': 'fit-content',
        'padding': '6px 8px',
        'textTransform': 'none',
        ...theme.applyStyles('dark', {
          ':hover': {
            backgroundColor: gray[800],
            borderColor: gray[700],
            color: theme.palette.text.primary,
          },
          [`&.${tabClasses.selected}`]: {
            color: '#fff',
          },
        }),
      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: ({ theme }) => ({
        backgroundColor: theme.palette.grey[800],
        ...theme.applyStyles('dark', {
          backgroundColor: theme.palette.grey[200],
        }),
      }),
      root: { minHeight: 'fit-content' },
    },
  },
};

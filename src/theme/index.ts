'use client';

import { createTheme } from '@mui/material/styles';

import getMPTheme from './get-mp-theme';

// ----------------------------------------------------------------------

const lightTheme = createTheme(getMPTheme('light'));
const darkTheme = createTheme(getMPTheme('dark'));

const theme = {
  dark: darkTheme,
  light: lightTheme,
};

export default theme;

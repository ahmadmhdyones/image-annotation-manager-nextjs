import type {} from '@mui/material/themeCssVarsAugmentation';
import { PaletteMode, ThemeOptions } from '@mui/material/styles';

import { getDesignTokens } from './theme-primitives';
import { inputsCustomizations, navigationCustomizations } from './customizations';

export default function getMPTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...getDesignTokens(mode),
    components: {
      ...inputsCustomizations,
      ...navigationCustomizations,
    },
  };
}

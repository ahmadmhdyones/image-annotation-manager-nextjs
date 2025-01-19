import { useTheme, useMediaQuery } from '@mui/material';

// ----------------------------------------------------------------------

export function useResponsiveGrid() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallDesktop = useMediaQuery('(max-width:1200px)');

  const getColumnCount = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    if (isSmallDesktop) return 2;
    return 3;
  };

  const getRowHeight = (columnWidth: number) => {
    if (isMobile) return columnWidth * 1.4;
    if (isTablet) return columnWidth * 1.35;
    if (isSmallDesktop) return columnWidth * 1.2;
    return columnWidth * 1.15;
  };

  const getPadding = () => ({
    paddingLeft: isMobile ? 0 : isTablet ? 16 : 24,
    paddingRight: isMobile ? 0 : isTablet ? 16 : 24,
  });

  return {
    getColumnCount,
    getPadding,
    getRowHeight,
    isMobile,
    isSmallDesktop,
    isTablet,
  };
}

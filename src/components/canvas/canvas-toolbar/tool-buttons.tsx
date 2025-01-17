import { Box, styled, IconButton, ButtonProps, IconButtonProps } from '@mui/material';

// ----------------------------------------------------------------------

interface ToolButtonProps extends IconButtonProps {
  isSelected?: boolean;
}

export const ToolButton = styled(IconButton, {
  shouldForwardProp: prop => prop !== 'isSelected',
})<ToolButtonProps>(({ isSelected, theme }) => ({
  '&:hover': {
    backgroundColor: isSelected ? theme.palette.primary.dark : theme.palette.action.hover,
  },
  'backgroundColor': isSelected ? theme.palette.primary.main : 'transparent',
  'color': isSelected ? theme.palette.primary.contrastText : 'inherit',
  'height': 32,
  'width': 32,
}));

// ----------------------------------------------------------------------

export const ColorButton = styled(ToolButton, {
  shouldForwardProp: prop => prop !== 'color',
})<ButtonProps>(({ color }) => ({
  '&::after': {
    backgroundColor: color,
    border: '2px solid #fff',
    borderRadius: '50%',
    boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
    content: '""',
    display: 'block',
    height: 20,
    width: 20,
  },
}));

// ----------------------------------------------------------------------

export function ToolDivider() {
  return (
    <Box
      sx={{
        borderColor: 'divider',
        borderRight: 1,
        mx: 1,
        width: 1,
      }}
    />
  );
}

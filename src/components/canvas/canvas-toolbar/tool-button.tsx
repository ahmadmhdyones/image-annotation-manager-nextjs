import { styled, IconButton, IconButtonProps } from '@mui/material';

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


export default ToolButton;

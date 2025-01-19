import { Box, Alert, SxProps, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// ----------------------------------------------------------------------

type ErrorContentProps = {
  title?: string;
  message?: string;
  error?: unknown;
  icon?: React.ReactNode;
  sx?: SxProps;
};

export default function ErrorContent({
  error,
  icon = <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: 60 }} />,
  message = 'Something went wrong. Please try again later.',
  sx,
  title = 'Error',
}: ErrorContentProps) {
  const errorMessage = error instanceof Error ? error.message : message;

  return (
    <Box sx={{ p: 3, textAlign: 'center', ...sx }}>
      {icon && <Box sx={{ mb: 2 }}>{icon}</Box>}

      <Typography color='error.main' gutterBottom variant='h6'>
        {title}
      </Typography>

      <Alert severity='error' sx={{ maxWidth: 400, mx: 'auto' }}>
        {errorMessage}
      </Alert>
    </Box>
  );
}

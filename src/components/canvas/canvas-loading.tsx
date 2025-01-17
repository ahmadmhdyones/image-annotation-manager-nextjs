import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function CanvasLoading() {
  return (
    <Box
      component='div'
      sx={{
        alignItems: 'center',
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        pointerEvents: 'none',
        position: 'absolute',
        right: 0,
        top: 0,
        transform: 'translateZ(0)',
        userSelect: 'none',
        WebkitBackdropFilter: 'blur(8px)',
        willChange: 'transform',
        zIndex: 9999,
      }}
    >
      Loading...
    </Box>
  );
}

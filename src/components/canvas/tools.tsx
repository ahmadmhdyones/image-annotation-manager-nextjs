import { Delete, Square, NearMe, Gesture } from '@mui/icons-material';

import { CanvasTools } from '@/types/canvas-tools.enum';
import { CanvasToolbarTool } from '@/types/canvas.types';

// ----------------------------------------------------------------------

export const tools: CanvasToolbarTool[] = [
  {
    icon: <NearMe sx={{ fontSize: 18 }} />,
    label: 'Pan',
    tool: CanvasTools.GRAB,
  },
  {
    disabled: true,
    icon: <Gesture sx={{ fontSize: 18 }} />,
    label: 'Draw',
    tool: CanvasTools.DRAW,
  },
  null, // Divider
  {
    icon: <Square sx={{ fontSize: 18 }} />,
    label: 'Rectangle',
    tool: CanvasTools.SHAPE,
  },
  {
    icon: <Delete sx={{ fontSize: 18 }} />,
    label: 'Erase',
    tool: CanvasTools.ERASE,
  },
];

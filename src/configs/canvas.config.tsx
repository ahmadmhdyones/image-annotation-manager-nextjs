import { CanvasTools } from '@/types/canvas-tools.enum';
import { CanvasToolbarTool } from '@/types/canvas.types';

// ----------------------------------------------------------------------

export const CANVAS_ZOOM_SCALE = 1.05;

export const CANVAS_DEFAULT_COLOR = '#000000';

export const CANVAS_DEFAULT_TOOL = CanvasTools.DRAW;

import { Delete, Square, NearMe, Gesture } from '@mui/icons-material';

export const CANVAS_TOOLS: CanvasToolbarTool[] = [
  {
    icon: <NearMe sx={{ fontSize: 18 }} />,
    label: 'Pan',
    tool: CanvasTools.GRAB,
  },
  {
    disabled: false,
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

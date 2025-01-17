import { Delete, NearMe, Gesture, SquareOutlined } from '@mui/icons-material';

import { CanvasTools } from '@/types/canvas-tools.enum';
import { CanvasToolbarTool } from '@/types/canvas.types';

// ----------------------------------------------------------------------

export const CANVAS_ZOOM_SCALE = 1.05;

export const CANVAS_DEFAULT_COLOR = '#FF0000';

export const CANVAS_DEFAULT_TOOL = CanvasTools.GRAB;

export const CANVAS_STROKE_WIDTH = 3;

export const CANVAS_TENSION = 0.5;

export const CANVAS_DASH_PATTERN = [2, 2];

export const CANVAS_DEFAULT_POINT = { x: 0, y: 0 };

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
    icon: <SquareOutlined sx={{ fontSize: 18 }} />,
    label: 'Rectangle',
    tool: CanvasTools.RECTANGLE,
  },
  {
    icon: <Delete sx={{ fontSize: 18 }} />,
    label: 'Erase',
    tool: CanvasTools.ERASE,
  },
];

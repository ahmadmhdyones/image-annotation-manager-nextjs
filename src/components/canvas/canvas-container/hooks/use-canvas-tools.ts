import { useState } from 'react';

import { CanvasTools } from '@/types/canvas-tools.enum';

import { CANVAS_DEFAULT_TOOL, CANVAS_DEFAULT_COLOR } from '@/configs/canvas.config';

// ----------------------------------------------------------------------

export function useCanvasTools() {
  const [tool, setTool] = useState<CanvasTools>(CANVAS_DEFAULT_TOOL);
  const [color, setColor] = useState<string>(CANVAS_DEFAULT_COLOR);

  return {
    color,
    setColor,
    setTool,
    tool,
  };
}

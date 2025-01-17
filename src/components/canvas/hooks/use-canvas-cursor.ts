import { useEffect } from 'react';

import { CanvasTools } from '@/types/canvas-tools.enum';

// ----------------------------------------------------------------------

const CURSOR_MAP = {
  [CanvasTools.DRAW]: 'crosshair',
  [CanvasTools.ERASE]: 'cell',
  [CanvasTools.GRAB]: 'default',
  [CanvasTools.RECTANGLE]: 'crosshair',
} as const;

export const useCanvasCursor = (tool: CanvasTools) => {
  useEffect(() => {
    const cursor = CURSOR_MAP[tool] || 'default';
    document.body.style.cursor = cursor;

    return () => {
      document.body.style.cursor = 'default';
    };
  }, [tool]);
};

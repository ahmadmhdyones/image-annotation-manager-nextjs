import { useEffect } from 'react';

import { CanvasTools } from '@/types/canvas-tools.enum';

// ----------------------------------------------------------------------

/**
 * useCanvasCursor Hook
 *
 * Manages cursor styles based on selected canvas tool:
 * - Maps different tools to appropriate cursor styles
 * - Updates cursor dynamically when tool changes
 * - Restores default cursor on cleanup
 * - Provides visual feedback for current tool mode
 *
 * Usage: useCanvasCursor(currentTool) in canvas components
 */

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

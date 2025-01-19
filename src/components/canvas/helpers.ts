import { Stage } from 'konva/lib/Stage';

import { TPoint } from '@/types/canvas.types';
import { CanvasTools } from '@/types/canvas-tools.enum';

// ----------------------------------------------------------------------

export const getStagePoint = (stage: Stage, point: TPoint): TPoint => ({
  x: (point.x - stage.x()) / stage.scaleX(),
  y: (point.y - stage.y()) / stage.scaleY(),
});

export const isDrawingTool = (tool: CanvasTools): boolean => {
  return [CanvasTools.DRAW, CanvasTools.RECTANGLE].includes(tool);
};

export const getRectDimensions = (start: TPoint, end: TPoint) => {
  const x = Math.min(start.x, end.x);
  const y = Math.min(start.y, end.y);
  const width = Math.abs(end.x - start.x);
  const height = Math.abs(end.y - start.y);
  return { height, width, x, y };
};

import { useCallback } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';

import { CANVAS_ZOOM_SCALE, CANVAS_DEFAULT_POINT } from '@/configs/canvas.config';

// ----------------------------------------------------------------------

export function useZoom() {
  const handleZoom = useCallback((e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const stage = e.target.getStage();
    if (!stage) return;

    const scaleBy = CANVAS_ZOOM_SCALE;
    const oldScale = stage.scaleX();
    const pointerPosition = stage.getPointerPosition() ?? CANVAS_DEFAULT_POINT;

    const mousePointTo = {
      x: pointerPosition.x / oldScale - stage.x() / oldScale,
      y: pointerPosition.y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: -(mousePointTo.x - pointerPosition.x / newScale) * newScale,
      y: -(mousePointTo.y - pointerPosition.y / newScale) * newScale,
    };

    stage.position(newPos);
  }, []);

  return { handleZoom };
}

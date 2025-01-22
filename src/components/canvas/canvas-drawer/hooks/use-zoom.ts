import { useRef, useCallback } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';

import { CANVAS_ZOOM_SCALE, CANVAS_DEFAULT_POINT } from '@/configs/canvas.config';

import { getCenter, getDistance } from '../../helpers';

// ----------------------------------------------------------------------

export function useZoom() {
  const lastCenter = useRef<{ x: number; y: number } | null>(null);
  const lastDist = useRef<number>(0);

  const handleWheel = useCallback((e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const stage = e.target.getStage();
    if (!stage) return;

    stage.draggable(false);

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

    stage.draggable(true);
  }, []);

  const handleTouchMove = useCallback((e: KonvaEventObject<TouchEvent>) => {
    e.evt.preventDefault();

    const stage = e.target.getStage();
    if (!stage) return;

    const [touch1, touch2] = e.evt.touches;

    if (touch1 && touch2) {
      // Handle pinch
      const center = getCenter(touch1, touch2);
      const dist = getDistance(touch1, touch2);

      if (!lastCenter.current) {
        lastCenter.current = center;
        lastDist.current = dist;
        return;
      }

      const pointTo = {
        x: (center.x - stage.x()) / stage.scaleX(),
        y: (center.y - stage.y()) / stage.scaleY(),
      };

      const scale = stage.scaleX() * (dist / lastDist.current);

      stage.scale({ x: scale, y: scale });

      const dx = center.x - lastCenter.current.x;
      const dy = center.y - lastCenter.current.y;

      const newPos = {
        x: center.x - pointTo.x * scale + dx,
        y: center.y - pointTo.y * scale + dy,
      };

      stage.position(newPos);

      lastDist.current = dist;
      lastCenter.current = center;
    }
  }, []);

  const handleTouchEnd = useCallback((_e: KonvaEventObject<TouchEvent>) => {
    lastCenter.current = null;
    lastDist.current = 0;
  }, []);

  return { handleTouchEnd, handleTouchMove, handleWheel };
}

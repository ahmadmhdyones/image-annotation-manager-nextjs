import { v4 as uuidv4 } from 'uuid';
import { useRef, useState, useCallback } from 'react';

import { getRectDimensions } from '@/components/canvas/helpers';

import { IAnnotation } from '@/types/models/annotation.types';
import { AnnotationShapes } from '@/types/annotation-shapes.enum';
import { TLine, TPoint, TRectangle, AnnotationShape } from '@/types/canvas.types';

import { ResourceCreateUpdateInput } from '@/helpers/api/types';

// ----------------------------------------------------------------------

interface UseDrawingProps {
  color: string;
  onAnnotationCreate: (annotation: Omit<ResourceCreateUpdateInput<IAnnotation>, 'imageId'>) => Promise<IAnnotation>;
  setLines: React.Dispatch<React.SetStateAction<AnnotationShape<TLine>[]>>;
  setRectangles: React.Dispatch<React.SetStateAction<AnnotationShape<TRectangle>[]>>;
}

export function useDrawing({ color, onAnnotationCreate, setLines, setRectangles }: UseDrawingProps) {
  const [tempRectangle, setTempRectangle] = useState<TRectangle | null>(null);
  const startPos = useRef<TPoint | null>(null);
  const isDrawing = useRef(false);

  const startDrawLine = useCallback(
    (stagePoint: TPoint) => {
      setLines(prev => [
        ...prev,
        {
          color,
          coordinates: { points: [stagePoint.x, stagePoint.y] },
          id: undefined,
          uuid: uuidv4(),
        },
      ]);
    },
    [color, setLines]
  );

  const resizeDrawLine = useCallback(
    (stagePoint: TPoint) => {
      setLines(prev => {
        const lastLine = prev[prev.length - 1];
        if (!lastLine) return prev;

        const updatedLine = {
          ...lastLine,
          coordinates: {
            points: lastLine.coordinates.points.concat([stagePoint.x, stagePoint.y]),
          },
        };

        return [...prev.slice(0, -1), updatedLine];
      });
    },
    [setLines]
  );

  const finalizeDrawLine = useCallback(() => {
    setLines(prev => {
      const lastDrawnLine = prev[prev.length - 1];
      if (!lastDrawnLine) return prev;

      // Fire and forget - don't await
      onAnnotationCreate({
        color,
        coordinates: lastDrawnLine.coordinates,
        type: AnnotationShapes.LINE,
      })
        .then(createdAnnotation => {
          setLines(current =>
            current.map(line => (line.uuid === lastDrawnLine.uuid ? { ...line, id: createdAnnotation.id } : line))
          );
        })
        .catch(error => {
          setLines(current => current.filter(line => line.uuid !== lastDrawnLine.uuid));
          console.error('Failed to create line:', error);
        });

      return prev;
    });
  }, [color, onAnnotationCreate, setLines]);

  const startDrawRectangle = useCallback((stagePoint: TPoint) => {
    startPos.current = stagePoint;
    setTempRectangle({ height: 0, width: 0, x: stagePoint.x, y: stagePoint.y });
  }, []);

  const resizeDrawRectangle = useCallback(
    (stagePoint: TPoint) => {
      if (startPos.current && tempRectangle) {
        const newRect = getRectDimensions(startPos.current, stagePoint);
        setTempRectangle(newRect);
      }
    },
    [tempRectangle]
  );

  const finalizeDrawRectangle = useCallback(() => {
    if (!tempRectangle) return;

    const newRect = {
      color,
      coordinates: tempRectangle,
      id: undefined,
      uuid: uuidv4(),
    };

    // Optimistically add the rectangle
    setRectangles(prev => [...prev, newRect]);
    setTempRectangle(null);
    startPos.current = null;

    // Fire and forget - don't await
    onAnnotationCreate({
      color,
      coordinates: tempRectangle,
      type: AnnotationShapes.RECTANGLE,
    })
      .then(createdAnnotation => {
        setRectangles(prev =>
          prev.map(rect => (rect.uuid === newRect.uuid ? { ...rect, id: createdAnnotation.id } : rect))
        );
      })
      .catch(error => {
        setRectangles(prev => prev.filter(rect => rect.uuid !== newRect.uuid));
        console.error('Failed to create rectangle:', error);
      });
  }, [tempRectangle, onAnnotationCreate, color, setRectangles]);

  return {
    finalizeDrawLine,
    finalizeDrawRectangle,
    isDrawing,
    resizeDrawLine,
    resizeDrawRectangle,
    startDrawLine,
    startDrawRectangle,
    startPos,
    tempRectangle,
  };
}

import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';

import { IAnnotation } from '@/types/models/annotation.types';
import { AnnotationShapes } from '@/types/annotation-shapes.enum';
import { TLine, TRectangle, AnnotationShape } from '@/types/canvas.types';

// ----------------------------------------------------------------------

export function useAnnotations(annotations: IAnnotation[]) {
  const [lines, setLines] = useState<AnnotationShape<TLine>[]>([]);
  const [rectangles, setRectangles] = useState<AnnotationShape<TRectangle>[]>([]);

  // Initialize
  useEffect(() => {
    setLines(() =>
      annotations
        .filter(annotation => annotation.type === AnnotationShapes.LINE)
        .map(annotation => ({
          color: annotation.color,
          coordinates: annotation.coordinates,
          id: annotation.id,
          uuid: uuidv4(),
        }))
    );
    setRectangles(
      annotations
        .filter(annotation => annotation.type === AnnotationShapes.RECTANGLE)
        .map(annotation => ({
          color: annotation.color,
          coordinates: annotation.coordinates,
          id: annotation.id,
          uuid: uuidv4(),
        }))
    );
  }, [annotations]);

  return { lines, rectangles, setLines, setRectangles };
}

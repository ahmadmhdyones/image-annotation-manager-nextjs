import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';

import { IAnnotation } from '@/types/models/annotation.types';
import { AnnotationShapes } from '@/types/annotation-shapes.enum';
import { TLine, TRectangle, AnnotationShape } from '@/types/canvas.types';

// ----------------------------------------------------------------------

/**
 * useAnnotations Hook
 *
 * Canvas data management:
 * - Initializes with fetched annotations from container
 * - Separates storage by annotation type (lines, rectangles)
 * - Intentionally keeps simple data structure for clarity
 *
 * UUID Strategy:
 * - Uses temporary UUID for new annotations on frontend
 * - Allows tracking before backend synchronization
 * - Will be replaced with actual backend ID after saving
 * - Enables immediate drawing feedback with proper state management
 */

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

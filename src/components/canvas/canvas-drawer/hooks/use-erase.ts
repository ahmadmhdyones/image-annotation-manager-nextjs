import { useCallback } from 'react';
import { Shape } from 'konva/lib/Shape';
import { Stage as StageType } from 'konva/lib/Stage';

import { IAnnotation } from '@/types/models/annotation.types';
import { AnnotationShapes } from '@/types/annotation-shapes.enum';
import { TLine, TRectangle, AnnotationShape } from '@/types/canvas.types';

// ----------------------------------------------------------------------

/**
 * useErase Hook
 *
 * Manages annotation deletion with sync:
 * - Handles both line and rectangle erasure
 * - Provides immediate UI feedback (optimistic delete)
 * - Syncs deletions with backend
 *
 * Deletion Flow:
 * 1. Remove shape from Konva stage
 * 2. Update local state immediately
 * 3. Sync with backend
 * 4. Handle related data cleanup
 */

interface UseEraseProps {
  lines: AnnotationShape<TLine>[];
  rectangles: AnnotationShape<TRectangle>[];
  setLines: React.Dispatch<React.SetStateAction<AnnotationShape<TLine>[]>>;
  setRectangles: React.Dispatch<React.SetStateAction<AnnotationShape<TRectangle>[]>>;
  onAnnotationDelete: (id: IAnnotation['id']) => void;
}

export function useErase({ lines, onAnnotationDelete, rectangles, setLines, setRectangles }: UseEraseProps) {
  const handleErase = useCallback(
    (target: Shape | StageType) => {
      const elementName = target.name();
      const elementUuid = target.id();
      let elementId: AnnotationShape['id'];

      if (elementName === AnnotationShapes.LINE) {
        elementId = lines.find(line => line.uuid === elementUuid)?.id;
      } else if (elementName === AnnotationShapes.RECTANGLE) {
        elementId = rectangles.find(rect => rect.uuid === elementUuid)?.id;
      } else {
        return; // Early return if element type is not recognized
      }

      // Destroy the Konva shape
      target.destroy();

      // Remove from state
      if (elementName === AnnotationShapes.LINE) {
        setLines(prev => prev.filter(line => line.uuid !== elementUuid));
      } else if (elementName === AnnotationShapes.RECTANGLE) {
        setRectangles(prev => prev.filter(rect => rect.uuid !== elementUuid));
      }

      if (elementId) {
        onAnnotationDelete(elementId);
      }
    },
    [lines, rectangles, setLines, setRectangles, onAnnotationDelete]
  );

  return { handleErase };
}

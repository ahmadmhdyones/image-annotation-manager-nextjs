import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { IImage } from '@/types/models/image.types';

import { queryKeys } from '@/helpers/react-query/query-keys.enum';

// ----------------------------------------------------------------------

/**
 * useInvalidateAnnotations Hook
 *
 * Manages cache cleanup when leaving canvas:
 * - Invalidates annotation-related queries on unmount
 * - Ensures fresh data on next visit
 *
 * Triggers on: Component unmount (leaving canvas view)
 */

export const useInvalidateAnnotations = (imageId: IImage['id']) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.imageAnnotationsCount(imageId)] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.imageAnnotations(imageId)] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.annotationsCount()] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.annotations()] });
    };
  }, [imageId, queryClient]);
};

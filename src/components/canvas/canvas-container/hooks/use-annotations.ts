import { useQuery, useMutation } from '@tanstack/react-query';

import { IImage } from '@/types/models/image.types';
import { IAnnotation } from '@/types/models/annotation.types';

import { imageAPI } from '@/helpers/api/resources/image';
import { ResourceCreateUpdateInput } from '@/helpers/api/types';
import { queryKeys } from '@/helpers/react-query/query-keys.enum';
import { annotationAPI } from '@/helpers/api/resources/annotation';

// ----------------------------------------------------------------------

/**
 * useAnnotations Hook
 *
 * Manages annotation data synchronization:
 * - Fetches existing annotations for an image
 * - Ensures data consistency between server and client
 *
 */

export function useAnnotations(imageId: IImage['id']) {
  const {
    data: annotations = [],
    isLoading: isLoadingAnnotations,
    isRefetching: isRefetchingAnnotations,
  } = useQuery({
    queryFn: async () => await imageAPI.getAnnotations(imageId),
    queryKey: [queryKeys.imageAnnotations(imageId)],
  });

  const { mutateAsync: createAnnotation } = useMutation({
    mutationFn: async (annotation: Omit<ResourceCreateUpdateInput<IAnnotation>, 'imageId'>) =>
      await annotationAPI.create({ ...annotation, imageId }),
  });

  const { mutate: deleteAnnotation } = useMutation({
    mutationFn: (annotationId: IAnnotation['id']) => annotationAPI.delete(annotationId),
  });

  return {
    annotations,
    createAnnotation,
    deleteAnnotation,
    isLoadingAnnotations,
    isRefetchingAnnotations,
  };
}

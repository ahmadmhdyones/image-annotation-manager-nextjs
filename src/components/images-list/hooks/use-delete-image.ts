import { toast } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IImage } from '@/types/models/image.types';

import { imageAPI } from '@/helpers/api/resources/image';
import { queryKeys } from '@/helpers/react-query/query-keys.enum';

// ----------------------------------------------------------------------

/**
 * useDeleteImage Hook
 *
 * Handles image deletion with optimistic updates and cache invalidation.
 */

export const useDeleteImage = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: (id: number) => imageAPI.delete(id),
    onError: (_err, _deletedId, context: { previousImages: IImage[] | undefined } | undefined) => {
      queryClient.setQueryData([queryKeys.images()], context?.previousImages);
    },
    onMutate: async deletedId => {
      if (searchParams.toString()) {
        toast.error('You can only delete images when you are not filtering');
        return;
      }

      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: [queryKeys.images()] });

      // Snapshot the previous value
      const previousImages = queryClient.getQueryData<IImage[]>([queryKeys.images()]);

      // Optimistically remove the category from the list
      queryClient.setQueryData<IImage[]>([queryKeys.images()], old => old?.filter(image => image.id !== deletedId));

      // Return context with the previous images
      return { previousImages };
    },
  });
};

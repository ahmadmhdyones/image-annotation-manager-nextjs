import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ICategory } from '@/types/models/category.types';

import { categoryAPI } from '@/helpers/api/resources/category';
import { queryKeys } from '@/helpers/react-query/query-keys.enum';

// ----------------------------------------------------------------------

/**
 * useDeleteCategory Hook
 *
 * Handles category deletion with optimistic updates and cache invalidation.
 */

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => categoryAPI.delete(id),
    onError: (_err, _deletedId, context: { previousCategories: ICategory[] | undefined } | undefined) => {
      queryClient.setQueryData([queryKeys.categories()], context?.previousCategories);
    },
    onMutate: async deletedId => {
      await queryClient.cancelQueries({ queryKey: [queryKeys.categories()] });
      const previousCategories = queryClient.getQueryData<ICategory[]>([queryKeys.categories()]);
      queryClient.setQueryData<ICategory[]>([queryKeys.categories()], old =>
        old?.filter(category => category.id !== deletedId)
      );
      return { previousCategories };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.categoriesCount()] });
    },
  });
};

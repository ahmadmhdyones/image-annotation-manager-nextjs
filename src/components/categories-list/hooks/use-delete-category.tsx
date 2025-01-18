import { toast } from 'react-hot-toast';
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
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: [queryKeys.categories()] });

      // Snapshot the previous value
      const previousCategories = queryClient.getQueryData<ICategory[]>([queryKeys.categories()]);
      const previousCategoriesCount = queryClient.getQueryData<number>([queryKeys.categoriesCount()]);

      // Optimistically remove the category from the list
      queryClient.setQueryData<ICategory[]>([queryKeys.categories()], old =>
        old?.filter(category => category.id !== deletedId)
      );

      // Optimistically update the categories count
      if (previousCategoriesCount && previousCategoriesCount > 0) {
        queryClient.setQueryData<number>([queryKeys.categoriesCount()], previousCategoriesCount - 1);
      }

      // Return context with the previous categories
      return { previousCategories };
    },
    onSuccess: () => {
      toast.success('Category deleted successfully');
    },
  });
};

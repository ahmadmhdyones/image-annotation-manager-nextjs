import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ICategory } from '@/types/models/category.types';

import { paths } from '@/helpers/map-routes';
import { queryKeys } from '@/helpers/react-query';
import { categoryAPI } from '@/helpers/api/resources/category';

// ----------------------------------------------------------------------

export default function useUpdateCategory(category: ICategory) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: Omit<ICategory, 'id'>) => await categoryAPI.update(Number(category.id), data),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.categories()] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.category(Number(data.id))] });
      toast.success('Category updated successfully');
      router.push(paths.dashboard.categories.root.to());
    },
  });
}

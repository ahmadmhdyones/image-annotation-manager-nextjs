'use client';

import { useQuery } from '@tanstack/react-query';

import { ICategory } from '@/types/models/category.types';

import { categoryAPI } from '@/helpers/api/resources/category';
import { queryKeys } from '@/helpers/react-query/query-keys.enum';

// ----------------------------------------------------------------------

export default function useGetCategories(initialData: ICategory[] = []) {
  return useQuery({
    initialData,
    queryFn: async () => await categoryAPI.getMany(),
    queryKey: [queryKeys.categories()],
    refetchOnMount: 'always',
  });
}

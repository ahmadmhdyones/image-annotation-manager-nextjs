'use client';

import { useQuery, UndefinedInitialDataOptions } from '@tanstack/react-query';

import { ICategory } from '@/types/models/category.types';

import { categoryAPI } from '@/helpers/api/resources/category';
import { queryKeys } from '@/helpers/react-query/query-keys.enum';

// ----------------------------------------------------------------------

export default function useGetCategory(
  id: ICategory['id'],
  options?: Partial<UndefinedInitialDataOptions<ICategory, Error, ICategory, string[]>>
) {
  return useQuery({
    enabled: !!id,
    initialData: options?.initialData,
    queryFn: () => categoryAPI.getOne(id),
    queryKey: [queryKeys.category(id)],
    staleTime: options?.staleTime,
    ...options,
  });
}

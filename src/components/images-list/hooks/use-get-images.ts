'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { ImageFilters } from '@/components/image-filter-form/hooks/use-image-filters';

import { IImage } from '@/types/models/image.types';

import { QueryParams } from '@/helpers/map-params';
import { imageAPI } from '@/helpers/api/resources/image';
import { queryKeys } from '@/helpers/react-query/query-keys.enum';

// ----------------------------------------------------------------------

export default function useGetImages(initialData?: IImage[]) {
  const searchParams = useSearchParams();

  const filters: ImageFilters = {
    format: searchParams.get(QueryParams.FORMAT) || undefined,
    name: searchParams.get(QueryParams.NAME) || '',
    resolution: searchParams.get(QueryParams.RESOLUTION) || undefined,
  };

  const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value)) as ImageFilters;

  return useQuery({
    initialData,
    queryFn: () => imageAPI.getMany<any>({ params: cleanFilters }),
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [queryKeys.images(), ...(searchParams.size ? [searchParams.toString()] : [])],
  });
}

'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { ImageFilters } from '@/components/image-filter-form/hooks/use-image-filters';

import { IImage } from '@/types/models/image.types';

import { FilterKeys, IMAGE_FILTERS_CONFIG } from '@/configs/image-filters.config';

import { imageAPI } from '@/helpers/api/resources/image';
import { queryKeys } from '@/helpers/react-query/query-keys.enum';

// ----------------------------------------------------------------------

/**
 * useGetImages Hook
 *
 * Handles image fetching with URL search parameters:
 * - Integrates React Query with Next.js search params
 * - Manages image filtering through URL parameters
 * - Supports SSR with initialData
 *
 * TODO: Future improvements
 * - Extract filters to separate components
 * - Pass filter state via props for better component isolation
 * - Implement proper pagination and sorting
 */

export default function useGetImages(initialData?: IImage[]) {
  const searchParams = useSearchParams();

  const filters = useMemo(() => {
    return Object.entries(IMAGE_FILTERS_CONFIG).reduce((acc, [key, config]) => {
      const value = searchParams.get(config.param);
      if (value) {
        (acc as any)[key as FilterKeys] = value;
      }
      return acc;
    }, {} as Partial<ImageFilters>);
  }, [searchParams]);

  return useQuery({
    initialData,
    queryFn: () => imageAPI.getMany<any>({ params: filters }),
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [queryKeys.images(), ...(searchParams.size ? [searchParams.toString()] : [])],
  });
}

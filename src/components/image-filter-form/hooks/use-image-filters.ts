'use client';

import debounce from 'lodash/debounce';
import { useMemo, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { FilterKeys, IMAGE_FILTERS_CONFIG } from '@/configs/image-filters.config';

// ----------------------------------------------------------------------

export type ImageFilters = {
  [K in FilterKeys]: (typeof IMAGE_FILTERS_CONFIG)[K]['default'];
};

export function useImageFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Create state dynamically based on config
  const [filters, setFilters] = useState<ImageFilters>(() => {
    return Object.entries(IMAGE_FILTERS_CONFIG).reduce(
      (acc, [key, config]) => ({
        ...acc,
        [key]: searchParams.get(config.param) ?? config.default,
      }),
      {} as ImageFilters
    );
  });

  const debouncedUpdateURL = useMemo(
    () =>
      debounce((newFilters: Partial<ImageFilters>) => {
        const params = new URLSearchParams(searchParams);

        Object.entries(newFilters).forEach(([key, value]) => {
          const { param } = IMAGE_FILTERS_CONFIG[key as FilterKeys];
          if (value) {
            params.set(param, value);
          } else {
            params.delete(param);
          }
        });

        router.push(`?${params.toString()}`, { scroll: false });
      }, 500),
    [router, searchParams]
  );

  const handleChange = useCallback(
    (updates: Partial<ImageFilters>) => {
      setFilters(prev => ({ ...prev, ...updates }));
      debouncedUpdateURL(updates);
    },
    [debouncedUpdateURL]
  );

  const handleReset = () => {
    const defaultFilters = Object.entries(IMAGE_FILTERS_CONFIG).reduce(
      (acc, [key, config]) => ({
        ...acc,
        [key]: config.default,
      }),
      {} as ImageFilters
    );

    setFilters(defaultFilters);
    debouncedUpdateURL(defaultFilters);
  };

  return {
    filters,
    handleChange,
    handleReset,
  };
}

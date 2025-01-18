'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { QueryParams } from '@/helpers/map-params';

// ----------------------------------------------------------------------

export type ImageFilters = {
  name: string;
  format: string | undefined;
  resolution: string | undefined;
};

export function useImageFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [name, setName] = useState(searchParams.get(QueryParams.NAME) || '');
  const [format, setFormat] = useState<string | null>(searchParams.get(QueryParams.FORMAT));
  const [resolution, setResolution] = useState<string | null>(searchParams.get(QueryParams.RESOLUTION));

  const updateURL = useCallback(
    (newName: string, newFormat: string | null, newResolution: string | null) => {
      const params = new URLSearchParams();

      if (newName) params.set(QueryParams.NAME, newName);
      if (newFormat) params.set(QueryParams.FORMAT, newFormat);
      if (newResolution) params.set(QueryParams.RESOLUTION, newResolution);

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  const handleChange = useCallback(
    (newName: string, newFormat: string | null, newResolution: string | null) => {
      updateURL(newName, newFormat, newResolution);
    },
    [updateURL]
  );

  return {
    format,
    handleChange,
    name,
    resolution,
    setFormat,
    setName,
    setResolution,
  };
}

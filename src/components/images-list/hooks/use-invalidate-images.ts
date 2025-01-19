import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/helpers/react-query';

// ----------------------------------------------------------------------

/**
 * useInvalidateImages Hook
 *
 * Manages React Query cache invalidation:
 * - Triggers cache refresh for images and related data
 * - Executes invalidation on component unmount
 * - Ensures data consistency after mutations
 * - Invalidates both images and annotations counts
 *
 * Usage: When deleting/updating images to refresh related lists
 */

export default function useInvalidateImages({ shouldInvalidate }: { shouldInvalidate: boolean }) {
  const queryClient = useQueryClient();

  const [toInvalidate, setToInvalidate] = useState(false);

  useEffect(() => {
    if (shouldInvalidate) {
      setToInvalidate(true);
    }
  }, [shouldInvalidate]);

  useEffect(() => {
    return () => {
      if (toInvalidate) {
        queryClient.invalidateQueries({ queryKey: [queryKeys.images()] });
        queryClient.invalidateQueries({ queryKey: [queryKeys.imagesCount()] });
        queryClient.invalidateQueries({ queryKey: [queryKeys.annotations()] });
        queryClient.invalidateQueries({ queryKey: [queryKeys.annotationsCount()] });
      }
    };
  }, [queryClient, toInvalidate]);
}

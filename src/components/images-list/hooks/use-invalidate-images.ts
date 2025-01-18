import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/helpers/react-query';

// ----------------------------------------------------------------------

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

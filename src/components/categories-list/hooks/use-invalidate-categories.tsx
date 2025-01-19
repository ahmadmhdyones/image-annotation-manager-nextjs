import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// ----------------------------------------------------------------------

export default function useInvalidateCategories({ shouldInvalidate }: { shouldInvalidate: boolean }) {
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
        queryClient.invalidateQueries();
      }
    };
  }, [queryClient, toInvalidate]);
}

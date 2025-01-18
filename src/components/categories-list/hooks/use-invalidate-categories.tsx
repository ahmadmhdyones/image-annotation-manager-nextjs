import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// ----------------------------------------------------------------------

export default function useInvalidateCategories() {
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries();
    };
  }, [queryClient]);
}

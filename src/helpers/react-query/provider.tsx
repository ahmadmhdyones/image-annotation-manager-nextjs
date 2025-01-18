'use client';

import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ----------------------------------------------------------------------

export default function Provider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            networkMode: 'offlineFirst',
            retry: 0,
            throwOnError: false,
          },
          queries: {
            networkMode: 'offlineFirst',
            refetchInterval: false,
            retry: 0,
            retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
            staleTime: 1000 * 60,
            throwOnError: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

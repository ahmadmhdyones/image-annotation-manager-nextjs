'use client';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { configTanstack } from '@/configs/global.config';

// ----------------------------------------------------------------------

export default function Provider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            networkMode: 'offlineFirst',
            retry: 1,
            throwOnError: true,
          },
          queries: {
            networkMode: 'offlineFirst',
            refetchInterval: false,
            retry: 1,
            retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
            staleTime: 1000 * 60,
            throwOnError: true,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={configTanstack.reactQueryDevtoolsInitialIsOpen} />
    </QueryClientProvider>
  );
}

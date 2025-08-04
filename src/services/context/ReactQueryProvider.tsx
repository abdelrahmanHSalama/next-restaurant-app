import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 60 * 1000,
        retry: 2,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

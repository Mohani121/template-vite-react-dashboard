import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '@/lib/api-error'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error) => {
        if (error instanceof ApiError && [401, 403].includes(error.status)) return false
        return failureCount < 2
      },
    },
    mutations: {
      retry: false,
    },
  },
})

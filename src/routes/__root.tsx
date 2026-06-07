import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/lib/query-client'
import { AuthProvider } from '@/context/auth.context'
import { ThemeProvider } from '@/context/theme.context'
import { Button } from '@/components/ui/button'

export const Route = createRootRoute({
  notFoundComponent: () => (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h1 className="text-muted-foreground text-8xl font-bold">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page not found</h2>
        <p className="text-muted-foreground mt-2">The page you are looking for does not exist.</p>
      </div>
      <Button asChild>
        <Link to="/dashboard/overview">Back to Dashboard</Link>
      </Button>
    </div>
  ),
  component: () => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  ),
})

import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { tokenStore } from '@/lib/token'

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    if (tokenStore.get()) {
      throw redirect({ to: '/dashboard/overview' })
    }
  },
  component: () => (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  ),
})

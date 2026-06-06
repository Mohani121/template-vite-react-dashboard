import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { tokenStore } from '@/lib/token'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => {
    if (!tokenStore.get()) {
      throw redirect({ to: '/login' })
    }
  },
  component: () => (
    <div className="bg-background text-foreground flex min-h-svh">
      <aside className="w-64 border-r p-4">Sidebar</aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  ),
})

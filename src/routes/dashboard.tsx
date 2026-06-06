import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: () => (
    <div className="bg-background text-foreground flex min-h-svh">
      <aside className="w-64 border-r p-4">Sidebar</aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  ),
})

import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: () => (
    <div className="bg-background flex min-h-svh items-center justify-center">
      <div className="w-full max-w-sm px-4">
        <Outlet />
      </div>
    </div>
  ),
})

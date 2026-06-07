import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/overview')({
  component: () => (
    <div>
      <h1 className="text-2xl font-semibold">Overview</h1>
      <p className="text-muted-foreground mt-2">Dashboard overview goes here.</p>
    </div>
  ),
})

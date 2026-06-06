import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/login')({
  component: () => (
    <div className="text-foreground">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="text-muted-foreground mt-2">Login form goes here.</p>
    </div>
  ),
})

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/register')({
  component: () => (
    <div className="text-foreground">
      <h1 className="text-2xl font-semibold">Register</h1>
      <p className="text-muted-foreground mt-2">Register form goes here.</p>
    </div>
  ),
})

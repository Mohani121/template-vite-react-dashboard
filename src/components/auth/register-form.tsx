import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'
import { ApiError } from '@/lib/api-error'
import { cn } from '@/lib/utils'

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      try {
        setError(null)
        await register(value)
        await navigate({ to: '/dashboard/overview' })
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message)
        } else {
          setError('Something went wrong. Please try again.')
        }
      }
    },
  })

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            className="flex flex-col gap-4"
          >
            {error && (
              <p className="bg-destructive/10 text-destructive rounded-md px-4 py-2 text-center text-sm">
                {error}
              </p>
            )}

            <form.Field
              name="name"
              validators={{
                onBlur: ({ value }) => {
                  if (!value) return 'Name is required'
                  if (value.length < 2) return 'Name must be at least 2 characters'
                  return undefined
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-destructive text-sm">{field.state.meta.errors[0]}</p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="email"
              validators={{
                onBlur: ({ value }) => {
                  if (!value) return 'Email is required'
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    return 'Enter a valid email address'
                  return undefined
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-destructive text-sm"> {field.state.meta.errors[0]}</p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="password"
              validators={{
                onBlur: ({ value }) => {
                  if (!value) return 'Password is required'
                  if (value.length < 8) return 'Password must be at least 8 characters'
                  return undefined
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-destructive text-sm"> {field.state.meta.errors[0]}</p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Subscribe selector={(state) => ({ isSubmitting: state.isSubmitting })}>
              {({ isSubmitting }) => (
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </Button>
              )}
            </form.Subscribe>

            <p className="text-muted-foreground text-center text-sm">
              Already have an account?{' '}
              <a href="/login" className="hover:text-primary underline underline-offset-4">
                Sign in
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
      <p className="text-muted-foreground px-6 text-center text-xs">
        By clicking continue, you agree to our{' '}
        <a href="#" className="hover:text-primary underline underline-offset-4">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="hover:text-primary underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  )
}

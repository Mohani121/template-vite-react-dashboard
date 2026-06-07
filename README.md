# template-vite-react-dashboard

A production-ready frontend dashboard template built with Vite, React, and TypeScript. Clone it, configure your API URL, and start writing business logic immediately.

Designed to pair with [template-nestjs-api](https://github.com/your-username/template-nestjs-api) but works with any REST API that follows the `ApiResponse<T>` shape.

## Stack

- **Vite** + **React** + **TypeScript**
- **TailwindCSS v4** + **shadcn/ui** — single centralized styling system
- **TanStack Router** — file-based routing
- **TanStack Query** — server state management
- **TanStack Form** — form state and validation
- **Axios** — HTTP client with interceptors
- **React Context + useReducer** — auth state

## Features

- Auth flow — login, register, logout with JWT access tokens
- Silent token refresh on 401 via httpOnly refresh cookie
- Protected routes with auth guard
- Public routes with redirect if already authenticated
- Dark / light / system theme toggle
- Collapsible sidebar layout (shadcn sidebar-07)
- Global `ApiResponse<T>` unwrapping in axios interceptors
- ESLint + Prettier + Husky + lint-staged
- GitHub Actions CI

## Project Structure

src/
api/ # API call functions (auth, etc.)
components/ # Shared UI components and sidebar
context/ # React Context providers (auth, theme)
hooks/ # Custom hooks (useAuth)
lib/ # axios instance, token store, query client, utils
routes/ # File-based routes
\_auth/ # Public layout (login, register)
dashboard/ # Protected layout (sidebar shell)
types/ # Shared TypeScript types

## Getting Started

### 1. Clone the template

```bash
git clone https://github.com/your-username/template-vite-react-dashboard.git my-app
cd my-app
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Start development server

```bash
pnpm dev
```

## Available Scripts

| Script            | Description                         |
| ----------------- | ----------------------------------- |
| `pnpm dev`        | Start development server            |
| `pnpm build`      | Type-check and build for production |
| `pnpm preview`    | Preview production build            |
| `pnpm lint`       | Run ESLint                          |
| `pnpm format`     | Format all files with Prettier      |
| `pnpm type-check` | Run TypeScript type checker         |

## API Contract

This template expects the backend to return responses in this shape:

```ts
// Success
{ success: true, data: T }

// Error
{ success: false, error: { code: string, message: string } }
```

The axios interceptor in `src/lib/axios.ts` unwraps this automatically — callers receive `data` directly.

## Auth Flow

1. User submits login/register form
2. Backend returns `{ accessToken }` + sets httpOnly refresh cookie
3. Access token stored in memory (`src/lib/token.ts`) — never in localStorage
4. On 401, interceptor silently calls `POST /auth/refresh` using the cookie
5. On refresh failure, user is redirected to `/login`

## Extending the Template

### Add a new dashboard page

Create `src/routes/dashboard/your-page.tsx`:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/your-page')({
  component: () => (
    <div>
      <h1 className="text-2xl font-semibold">Your Page</h1>
    </div>
  ),
})
```

That's it — TanStack Router picks it up automatically.

### Add a new API module

Create `src/api/your-resource.ts`:

```ts
import { apiClient } from '@/lib/axios'
import type { YourType } from '@/types'

export const yourApi = {
  async getAll(): Promise<YourType[]> {
    const { data } = await apiClient.get<YourType[]>('/your-resource')
    return data
  },
}
```

### Add shadcn components

```bash
pnpm dlx shadcn@latest add <component>
```

## License

MIT

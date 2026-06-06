// In-memory access token store — never localStorage
// Axios interceptor reads from here directly
// On page refresh token is gone → /auth/me 401s → redirect to /login

let _accessToken: string | null = null

export const tokenStore = {
  get(): string | null {
    return _accessToken
  },
  set(token: string): void {
    _accessToken = token
  },
  clear(): void {
    _accessToken = null
  },
}

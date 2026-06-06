// Thrown by axios interceptor when backend returns
// { success: false, error: { code, message } }

export class ApiError extends Error {
  public readonly code: string
  public readonly status: number

  constructor(code: string, message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
  }
}

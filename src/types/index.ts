// API Response shape — mirrors the backend template-nestjs-api contract

export interface ApiSuccessResponse<T> {
  success: true
  data: T
}

export interface ApiErrorResponse {
  success: false
  error: {
    code: string
    message: string
  }
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

// Auth types

export interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'USER'
  createdAt: string
  updatedAt: string
}

export interface AuthTokens {
  accessToken: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

// Pagination — ready for TanStack Table

export interface PaginatedData<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

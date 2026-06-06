import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import type { ApiResponse } from '@/types'
import { tokenStore } from '@/lib/token'
import { ApiError } from '@/lib/api-error'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — attach access token
apiClient.interceptors.request.use((config) => {
  const token = tokenStore.get()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Silent refresh state
let isRefreshing = false
let refreshQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

function processQueue(error: unknown, token: string | null = null) {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token!)
  })
  refreshQueue = []
}

// Response interceptor — unwrap ApiResponse<T> and handle 401
apiClient.interceptors.response.use(
  (response) => {
    const body = response.data as ApiResponse<unknown>
    if (body.success === false) {
      throw new ApiError(body.error.code, body.error.message, response.status)
    }
    response.data = body.data
    return response
  },
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }
    const status: number = error.response?.status

    // 401 — attempt silent token refresh
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject })
        }).then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${token}`
          }
          return apiClient(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { data } = await apiClient.post<{ accessToken: string }>('/auth/refresh')
        const newToken = data.accessToken
        tokenStore.set(newToken)
        processQueue(null, newToken)
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        }
        return apiClient(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError)
        tokenStore.clear()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Normalize all other errors into ApiError
    const body = error.response?.data as ApiResponse<unknown> | undefined
    if (body && body.success === false) {
      throw new ApiError(body.error.code, body.error.message, status)
    }
    throw new ApiError('NETWORK_ERROR', error.message ?? 'Unknown error', status ?? 0)
  },
)

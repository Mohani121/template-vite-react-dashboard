import { apiClient } from '@/lib/axios'
import type { User, AuthTokens, LoginCredentials, RegisterCredentials } from '@/types'

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const { data } = await apiClient.post<AuthTokens>('/auth/login', credentials)
    return data
  },

  async register(credentials: RegisterCredentials): Promise<AuthTokens> {
    const { data } = await apiClient.post<AuthTokens>('/auth/register', credentials)
    return data
  },

  async getMe(): Promise<User> {
    const { data } = await apiClient.get<User>('/auth/me')
    return data
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  },
}

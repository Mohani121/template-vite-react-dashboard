/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useCallback, type ReactNode } from 'react'
import type { User, LoginCredentials, RegisterCredentials } from '@/types'
import { authApi } from '@/api/auth'
import { tokenStore } from '@/lib/token'
import { queryClient } from '@/lib/query-client'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

type AuthAction =
  | { type: 'AUTH_LOADING' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_LOGOUT' }

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_LOADING':
      return { ...state, isLoading: true }
    case 'AUTH_SUCCESS':
      return { user: action.payload, isAuthenticated: true, isLoading: false }
    case 'AUTH_LOGOUT':
      return { user: null, isAuthenticated: false, isLoading: false }
    default:
      return state
  }
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
}

export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = useCallback(async (credentials: LoginCredentials) => {
    dispatch({ type: 'AUTH_LOADING' })
    const { accessToken } = await authApi.login(credentials)
    tokenStore.set(accessToken)
    const user = await authApi.getMe()
    dispatch({ type: 'AUTH_SUCCESS', payload: user })
  }, [])

  const register = useCallback(async (credentials: RegisterCredentials) => {
    dispatch({ type: 'AUTH_LOADING' })
    const { accessToken } = await authApi.register(credentials)
    tokenStore.set(accessToken)
    const user = await authApi.getMe()
    dispatch({ type: 'AUTH_SUCCESS', payload: user })
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } finally {
      tokenStore.clear()
      queryClient.clear()
      dispatch({ type: 'AUTH_LOGOUT' })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

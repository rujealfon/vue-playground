import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import { API_ENDPOINTS } from '@/config/constants'
import { api } from '@/lib/api-client'

import type { User } from '../types/user-schemas'

export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>(API_ENDPOINTS.AUTH.ME)
  return response.data
}

export async function logoutUser(): Promise<void> {
  await api.post(API_ENDPOINTS.AUTH.LOGOUT)
}

export async function refreshToken(): Promise<{ token: string, refreshToken: string }> {
  const response = await api.post<{ token: string, refreshToken: string }>(
    API_ENDPOINTS.AUTH.REFRESH,
    {
      refreshToken: localStorage.getItem('refresh-token')
    }
  )
  return response.data
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['auth', 'current-user'],
    queryFn: getCurrentUser,
    enabled: !!localStorage.getItem('auth-token'),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Clear tokens
      localStorage.removeItem('auth-token')
      localStorage.removeItem('refresh-token')
      // Clear all queries
      queryClient.clear()
      // Redirect to login
      window.location.href = '/auth/login'
    },
    onError: (error) => {
      console.error('Logout failed:', error)
      // Even if logout fails, clear local state
      localStorage.removeItem('auth-token')
      localStorage.removeItem('refresh-token')
      queryClient.clear()
      window.location.href = '/auth/login'
    }
  })
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: refreshToken,
    onSuccess: (data) => {
      localStorage.setItem('auth-token', data.token)
      localStorage.setItem('refresh-token', data.refreshToken)
    }
  })
}

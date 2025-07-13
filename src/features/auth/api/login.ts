import { useMutation } from '@tanstack/vue-query'

import { API_ENDPOINTS } from '@/config/constants'
import { api } from '@/lib/api-client'

import type { LoginInput } from '../types/schemas'
import type { User } from '../types/user-schemas'

export type LoginResponse = {
  user: User
  token: string
  refreshToken: string
}

export async function loginUser(data: LoginInput): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data)
  return response.data
}

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem('auth-token', data.token)
      localStorage.setItem('refresh-token', data.refreshToken)
    },
    onError: (error) => {
      console.error('Login failed:', error)
    }
  })
}

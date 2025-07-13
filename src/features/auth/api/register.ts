import { useMutation } from '@tanstack/vue-query'

import { API_ENDPOINTS } from '@/config/constants'
import { api } from '@/lib/api-client'

import type { RegisterInput } from '../types/schemas'
import type { User } from '../types/user-schemas'

export type RegisterResponse = {
  user: User
  token: string
  refreshToken: string
}

export async function registerUser(data: RegisterInput): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, data)
  return response.data
}

export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem('auth-token', data.token)
      localStorage.setItem('refresh-token', data.refreshToken)
    },
    onError: (error) => {
      console.error('Registration failed:', error)
    }
  })
}

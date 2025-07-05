import type { LoginResponse, RegisterResponse } from '@/api/types'
import type { LoginFormData, RegisterFormData } from '@/schemas'

import { authService } from '@/api/services'

import { useApi } from './use-api'

export function useAuthLogin() {
  return useApi<LoginResponse>((data: LoginFormData) => authService.login(data))
}

export function useAuthRegister() {
  return useApi<RegisterResponse>((data: RegisterFormData) => authService.register(data))
}

export function useAuthLogout() {
  return useApi<void>(() => authService.logout())
}

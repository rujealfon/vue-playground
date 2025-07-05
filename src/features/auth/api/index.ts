import type { ApiResponse, User } from '@/shared/types'

import { ApiClient } from '@/shared/api'
import { APP_CONFIG } from '@/shared/config'

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type AuthResponse = {
  user: User
  token: string
  refreshToken: string
}

class AuthApi {
  private client: ApiClient

  constructor() {
    this.client = new ApiClient(APP_CONFIG.api.baseUrl)
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return this.client.post<AuthResponse>('/auth/login', credentials)
  }

  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    return this.client.post<AuthResponse>('/auth/register', data)
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.client.post<void>('/auth/logout')
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthResponse>> {
    return this.client.post<AuthResponse>('/auth/refresh', { refreshToken })
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.client.get<User>('/auth/me')
  }
}

export const authApi = new AuthApi()

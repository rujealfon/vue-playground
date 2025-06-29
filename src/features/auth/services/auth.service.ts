import { z } from 'zod'

import type { User } from '@/shared/types'

import { API_ENDPOINTS, STORAGE_KEYS } from '@/shared/constants'
import { api } from '@/shared/services/api'

import type {
  AuthError,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginForm,
  LoginResponse,
  RegisterForm,
  RegisterResponse,
  ResetPasswordRequest,
  UpdateProfileRequest,
} from '../types'

// Zod schemas for validation
const LoginResponseSchema = z.object({
  user: z.object({
    id: z.union([z.string(), z.number()]),
    name: z.string(),
    email: z.string().email(),
    avatar: z.string().optional(),
    role: z.enum(['admin', 'user', 'moderator']).transform(val => val as 'admin' | 'user' | 'moderator'),
    isActive: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  tokens: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
})

const RegisterResponseSchema = LoginResponseSchema.extend({
  message: z.string(),
})

class AuthService {
  // Login user
  async login(credentials: LoginForm): Promise<LoginResponse> {
    try {
      const response = await api(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        body: credentials,
      })

      const validatedResponse = LoginResponseSchema.parse(response)

      // Store tokens
      this.storeTokens(validatedResponse.tokens)

      return validatedResponse as LoginResponse
    }
    catch (error) {
      throw this.handleAuthError(error)
    }
  }

  // Register new user
  async register(userData: RegisterForm): Promise<RegisterResponse> {
    try {
      const response = await api(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        body: userData,
      })

      const validatedResponse = RegisterResponseSchema.parse(response)

      // Store tokens
      this.storeTokens(validatedResponse.tokens)

      return validatedResponse as RegisterResponse
    }
    catch (error) {
      throw this.handleAuthError(error)
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await api(API_ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST',
      })
    }
    catch (error) {
      console.warn('Logout API call failed:', error)
    }
    finally {
      // Always clear local storage
      this.clearTokens()
    }
  }

  // Get current user profile
  async getProfile(): Promise<User> {
    try {
      const response = await api<User>(API_ENDPOINTS.AUTH.PROFILE)
      return response
    }
    catch (error) {
      throw this.handleAuthError(error)
    }
  }

  // Update user profile
  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    try {
      const response = await api<User>(API_ENDPOINTS.AUTH.PROFILE, {
        method: 'PATCH',
        body: data,
      })
      return response
    }
    catch (error) {
      throw this.handleAuthError(error)
    }
  }

  // Change password
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    try {
      await api('/auth/change-password', {
        method: 'POST',
        body: data,
      })
    }
    catch (error) {
      throw this.handleAuthError(error)
    }
  }

  // Forgot password
  async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
    try {
      const response = await api<{ message: string }>('/auth/forgot-password', {
        method: 'POST',
        body: data,
      })
      return response
    }
    catch (error) {
      throw this.handleAuthError(error)
    }
  }

  // Reset password
  async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    try {
      const response = await api<{ message: string }>('/auth/reset-password', {
        method: 'POST',
        body: data,
      })
      return response
    }
    catch (error) {
      throw this.handleAuthError(error)
    }
  }

  // Refresh access token
  async refreshToken(): Promise<{ accessToken: string }> {
    try {
      const refreshToken = this.getRefreshToken()
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      const response = await api<{ accessToken: string }>(API_ENDPOINTS.AUTH.REFRESH, {
        method: 'POST',
        body: { refreshToken },
      })

      // Update stored access token
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.accessToken)

      return response
    }
    catch (error) {
      // If refresh fails, clear all tokens
      this.clearTokens()
      throw this.handleAuthError(error)
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAccessToken()
  }

  // Get access token
  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  }

  // Get refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
  }

  // Store tokens in localStorage
  private storeTokens(tokens: { accessToken: string, refreshToken: string }): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, tokens.accessToken)
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken)
  }

  // Clear tokens from localStorage
  private clearTokens(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
  }

  // Handle auth-specific errors
  private handleAuthError(error: any): AuthError {
    // Default error
    const defaultError: AuthError = {
      code: 'UNKNOWN_ERROR' as any,
      message: 'An unexpected error occurred',
    }

    if (!error)
      return defaultError

    // If it's already an AuthError, return it
    if (error.code && error.message)
      return error

    // Handle API errors
    if (error.status) {
      switch (error.status) {
        case 401:
          return {
            code: 'INVALID_CREDENTIALS' as any,
            message: 'Invalid email or password',
          }
        case 403:
          return {
            code: 'ACCOUNT_LOCKED' as any,
            message: 'Account is locked or suspended',
          }
        case 422:
          return {
            code: 'VALIDATION_ERROR' as any,
            message: error.data?.message || 'Validation failed',
            field: error.data?.field,
          }
        case 429:
          return {
            code: 'TOO_MANY_ATTEMPTS' as any,
            message: 'Too many attempts. Please try again later.',
          }
        default:
          return {
            code: 'NETWORK_ERROR' as any,
            message: 'Network error occurred. Please try again.',
          }
      }
    }

    return defaultError
  }
}

// Export singleton instance
export const authService = new AuthService()

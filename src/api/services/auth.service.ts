import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse
} from '@/api/types'

import { httpClient } from '@/api/client'

export const authService = {
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simulate API response
    const mockResponse: ApiResponse<LoginResponse> = {
      success: true,
      data: {
        user: {
          id: '1',
          name: 'John Doe',
          email: data.email,
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        tokens: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresIn: 3600
        }
      },
      message: 'Login successful'
    }

    return mockResponse
    // return httpClient.post<LoginResponse>('/auth/login', data)
  },

  async register(data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockResponse: ApiResponse<RegisterResponse> = {
      success: true,
      data: {
        user: {
          id: '1',
          name: data.name,
          email: data.email,
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        tokens: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresIn: 3600
        }
      },
      message: 'Registration successful'
    }

    return mockResponse
    // return httpClient.post<RegisterResponse>('/auth/register', data)
  },

  async refreshToken(data: RefreshTokenRequest): Promise<ApiResponse<RefreshTokenResponse>> {
    return httpClient.post<RefreshTokenResponse>('/auth/refresh', data)
  },

  async logout(): Promise<ApiResponse<void>> {
    return httpClient.post<void>('/auth/logout')
  }
}

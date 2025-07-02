import { api, authApi } from '@/api/client'

import type { AuthResponse, LoginForm, RegisterForm, User } from '../types'

import { authResponseSchema, userSchema } from '../types'

export class AuthService {
  // Login user
  static async login(credentials: LoginForm): Promise<AuthResponse> {
    try {
      // For demo purposes using jsonplaceholder - replace with your actual endpoint
      const _response = await authApi.post('/users', credentials)

      // Mock response for demo (since jsonplaceholder doesn't have auth)
      const mockAuthResponse: AuthResponse = {
        user: {
          id: '1',
          name: 'Demo User',
          email: credentials.email,
          role: 'user' as const,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        token: `demo-jwt-token-${Date.now()}`,
        refreshToken: `demo-refresh-token-${Date.now()}`
      }

      // Validate response with Zod
      const validatedResponse = authResponseSchema.parse(mockAuthResponse)

      // Store auth data
      this.storeAuthData(validatedResponse)

      return validatedResponse
    }
    catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // Register user
  static async register(userData: RegisterForm): Promise<AuthResponse> {
    try {
      // For demo purposes - replace with your actual endpoint
      const _response = await authApi.post('/users', userData)

      // Mock response for demo
      const mockAuthResponse: AuthResponse = {
        user: {
          id: '1',
          name: userData.name,
          email: userData.email,
          role: 'user' as const,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        token: `demo-jwt-token-${Date.now()}`,
        refreshToken: `demo-refresh-token-${Date.now()}`
      }

      // Validate response with Zod
      const validatedResponse = authResponseSchema.parse(mockAuthResponse)

      // Store auth data
      this.storeAuthData(validatedResponse)

      return validatedResponse
    }
    catch (error) {
      console.error('Register error:', error)
      throw error
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('auth-token')
      if (!token)
        return null

      // For demo purposes - replace with your actual endpoint
      const _response = await api.get<User>('/users/1')

      // Mock response for demo
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        role: 'user' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // Validate response with Zod
      return userSchema.parse(mockUser)
    }
    catch (error) {
      console.error('Get current user error:', error)
      this.clearAuthData()
      return null
    }
  }

  // Refresh token
  static async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = localStorage.getItem('auth-refresh-token')
      if (!refreshToken)
        return null

      // For demo purposes - replace with your actual endpoint
      const _response = await authApi.post('/auth/refresh', { refreshToken })

      // Mock response for demo
      const newToken = `demo-refreshed-token-${Date.now()}`

      localStorage.setItem('auth-token', newToken)
      return newToken
    }
    catch (error) {
      console.error('Refresh token error:', error)
      this.clearAuthData()
      return null
    }
  }

  // Logout user
  static async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('auth-token')
      if (token) {
        // For demo purposes - replace with your actual endpoint
        await api.post('/auth/logout')
      }
    }
    catch (error) {
      console.error('Logout error:', error)
    }
    finally {
      this.clearAuthData()
    }
  }

  // Store authentication data
  private static storeAuthData(authResponse: AuthResponse): void {
    localStorage.setItem('auth-token', authResponse.token)
    localStorage.setItem('auth-refresh-token', authResponse.refreshToken)
    localStorage.setItem('auth-user', JSON.stringify(authResponse.user))
  }

  // Clear authentication data
  static clearAuthData(): void {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('auth-refresh-token')
    localStorage.removeItem('auth-user')
  }

  // Get stored user data
  static getStoredUser(): User | null {
    try {
      const userData = localStorage.getItem('auth-user')
      if (!userData)
        return null

      return userSchema.parse(JSON.parse(userData))
    }
    catch (error) {
      console.error('Error parsing stored user data:', error)
      this.clearAuthData()
      return null
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = localStorage.getItem('auth-token')
    const user = this.getStoredUser()
    return !!(token && user)
  }
}

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { ApiError, LoginForm, RegisterForm, User } from '@/features/auth/types'

import { AuthService } from '@/features/auth/services/auth-service'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const isLoading = ref(false)

  // Error states
  const loginError = ref<ApiError | null>(null)
  const registerError = ref<ApiError | null>(null)
  const userError = ref<ApiError | null>(null)

  // Computed
  const isAuthenticated = computed(() => !!user.value && !!token.value)

  // Initialize auth state from localStorage
  const initializeAuth = () => {
    const storedUser = AuthService.getStoredUser()
    const storedToken = localStorage.getItem('auth-token')
    const storedRefreshToken = localStorage.getItem('auth-refresh-token')

    if (storedUser && storedToken) {
      user.value = storedUser
      token.value = storedToken
      refreshToken.value = storedRefreshToken
    }
  }

  // Actions
  const login = async (credentials: LoginForm) => {
    try {
      isLoading.value = true
      loginError.value = null

      const data = await AuthService.login(credentials)

      user.value = data.user
      token.value = data.token
      refreshToken.value = data.refreshToken

      return data
    }
    catch (error) {
      loginError.value = error as ApiError
      console.error('Login failed:', error)
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  const register = async (userData: RegisterForm) => {
    try {
      isLoading.value = true
      registerError.value = null

      const data = await AuthService.register(userData)

      user.value = data.user
      token.value = data.token
      refreshToken.value = data.refreshToken

      return data
    }
    catch (error) {
      registerError.value = error as ApiError
      console.error('Registration failed:', error)
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      isLoading.value = true
      await AuthService.logout()
    }
    catch (error) {
      console.error('Logout failed:', error)
    }
    finally {
      // Clear local data regardless of server response
      user.value = null
      token.value = null
      refreshToken.value = null
      loginError.value = null
      registerError.value = null
      userError.value = null
      isLoading.value = false
    }
  }

  const getCurrentUser = async () => {
    if (!isAuthenticated.value)
      return null

    try {
      isLoading.value = true
      userError.value = null

      const userData = await AuthService.getCurrentUser()
      if (userData) {
        user.value = userData
      }
      return userData
    }
    catch (error) {
      userError.value = error as ApiError
      console.error('Failed to fetch current user:', error)
      // If user fetch fails, might mean token is invalid
      if ((error as ApiError)?.statusCode === 401) {
        await logout()
      }
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  const refreshAuthToken = async () => {
    try {
      const newToken = await AuthService.refreshToken()
      if (newToken) {
        token.value = newToken
        return newToken
      }
      return null
    }
    catch (error) {
      console.error('Token refresh failed:', error)
      await logout()
      return null
    }
  }

  const clearAuthData = () => {
    user.value = null
    token.value = null
    refreshToken.value = null
    loginError.value = null
    registerError.value = null
    userError.value = null
    AuthService.clearAuthData()
  }

  // Initialize auth state when store is created
  initializeAuth()

  return {
    // State
    user: computed(() => user.value),
    token: computed(() => token.value),
    refreshToken: computed(() => refreshToken.value),
    isLoading: computed(() => isLoading.value),
    isAuthenticated,

    // Errors
    loginError: computed(() => loginError.value),
    registerError: computed(() => registerError.value),
    userError: computed(() => userError.value),

    // Actions
    login,
    register,
    logout,
    getCurrentUser,
    refreshAuthToken,
    clearAuthData,
    initializeAuth
  }
})

// Export types for better TypeScript support
export type AuthStore = ReturnType<typeof useAuthStore>

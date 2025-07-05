import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { AuthTokens, User } from '@/api/types'
import type { LoginFormData, RegisterFormData } from '@/schemas'

import { useAuthLogin, useAuthLogout, useAuthRegister } from '@/api/composables'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const tokens = ref<AuthTokens | null>(null)
  const isInitialized = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!user.value && !!tokens.value)
  const userRole = computed(() => user.value?.role || null)
  const userName = computed(() => user.value?.name || null)

  // Actions
  const login = async (credentials: LoginFormData) => {
    const { execute, error } = useAuthLogin()
    const result = await execute(credentials)

    if (result) {
      user.value = result.user
      tokens.value = result.tokens

      // Persist tokens
      localStorage.setItem('accessToken', result.tokens.accessToken)
      localStorage.setItem('refreshToken', result.tokens.refreshToken)

      return { success: true, user: result.user }
    }

    return { success: false, error: error.value }
  }

  const register = async (userData: RegisterFormData) => {
    const { execute, error } = useAuthRegister()
    const result = await execute(userData)

    if (result) {
      user.value = result.user
      tokens.value = result.tokens

      // Persist tokens
      localStorage.setItem('accessToken', result.tokens.accessToken)
      localStorage.setItem('refreshToken', result.tokens.refreshToken)

      return { success: true, user: result.user }
    }

    return { success: false, error: error.value }
  }

  const logout = async () => {
    const { execute } = useAuthLogout()

    try {
      await execute()
    }
    catch (error) {
      // Log error but continue with logout
      console.warn('Logout API call failed:', error)
    }

    // Clear state
    user.value = null
    tokens.value = null

    // Clear storage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  const initializeAuth = () => {
    if (isInitialized.value)
      return

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (accessToken && refreshToken) {
      tokens.value = {
        accessToken,
        refreshToken,
        expiresIn: 3600 // This should be read from token or stored separately
      }

      // In a real app, you'd validate the token and fetch user data
      // For now, we'll just set a mock user
      user.value = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }

    isInitialized.value = true
  }

  return {
    // State
    user,
    tokens,
    isInitialized,

    // Getters
    isAuthenticated,
    userRole,
    userName,

    // Actions
    login,
    register,
    logout,
    initializeAuth
  }
})

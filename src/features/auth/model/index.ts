import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { User } from '@/shared/types'

import type { LoginCredentials, RegisterData } from '../api'

import { authApi } from '../api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth-token'))
  const refreshToken = ref<string | null>(localStorage.getItem('auth-refresh-token'))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const setTokens = (authToken: string, authRefreshToken: string) => {
    token.value = authToken
    refreshToken.value = authRefreshToken
    localStorage.setItem('auth-token', authToken)
    localStorage.setItem('auth-refresh-token', authRefreshToken)
  }

  const clearTokens = () => {
    token.value = null
    refreshToken.value = null
    localStorage.removeItem('auth-token')
    localStorage.removeItem('auth-refresh-token')
  }

  const login = async (credentials: LoginCredentials) => {
    try {
      isLoading.value = true
      error.value = null

      const response = await authApi.login(credentials)

      if (response.success) {
        user.value = response.data.user
        setTokens(response.data.token, response.data.refreshToken)
      }
      else {
        error.value = response.message
      }
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed'
    }
    finally {
      isLoading.value = false
    }
  }

  const register = async (data: RegisterData) => {
    try {
      isLoading.value = true
      error.value = null

      const response = await authApi.register(data)

      if (response.success) {
        user.value = response.data.user
        setTokens(response.data.token, response.data.refreshToken)
      }
      else {
        error.value = response.message
      }
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Registration failed'
    }
    finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    }
    catch (err) {
      console.error('Logout error:', err)
    }
    finally {
      user.value = null
      clearTokens()
    }
  }

  const getCurrentUser = async () => {
    if (!token.value)
      return

    try {
      const response = await authApi.getCurrentUser()

      if (response.success) {
        user.value = response.data
      }
      else {
        clearTokens()
      }
    }
    catch (err) {
      console.error('Get current user error:', err)
      clearTokens()
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    getCurrentUser
  }
})

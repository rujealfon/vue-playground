import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'

import type { User } from '../types/user-schemas'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  const setUser = (userData: User | null) => {
    user.value = userData
    error.value = null
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  const clearAuth = () => {
    user.value = null
    error.value = null
    localStorage.removeItem('auth-token')
    localStorage.removeItem('refresh-token')
  }

  const hasPermission = (_permission: string) => {
    if (!user.value)
      return false

    // Admin has all permissions
    if (user.value.role === 'admin')
      return true

    // Add more granular permission logic here
    return false
  }

  return {
    // State
    user: readonly(user),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Getters
    isAuthenticated,
    isAdmin,

    // Actions
    setUser,
    setLoading,
    setError,
    clearAuth,
    hasPermission
  }
})

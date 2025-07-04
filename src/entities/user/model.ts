import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'

export type User = {
  id: string
  email: string
  name: string
  avatar?: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterData = {
  email: string
  password: string
  name: string
  confirmPassword: string
}

export type AuthState = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const setUser = (userData: User) => {
    user.value = userData
    isAuthenticated.value = true
    error.value = null
  }

  const clearUser = () => {
    user.value = null
    isAuthenticated.value = false
    error.value = null
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  const logout = () => {
    clearUser()
    // Clear any stored tokens
    localStorage.removeItem('auth_token')
  }

  return {
    // State
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    error: readonly(error),
    // Actions
    setUser,
    clearUser,
    setLoading,
    setError,
    logout
  }
})

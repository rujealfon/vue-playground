import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { AuthError, ChangePasswordRequest, LoginForm, RegisterForm, UpdateProfileRequest } from '@/features/auth/types/auth.type'
import type { User } from '@/shared/types/user'

import { authService } from '@/features/auth/services/auth.service'
import { useToast } from '@/shared/composables/use-toast'
import { SUCCESS_MESSAGES } from '@/shared/constants/messages'

export const useAuthStore = defineStore('auth', () => {
  // Initialize toast
  const toast = useToast()

  // State
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value && authService.isAuthenticated())
  const userRole = computed(() => user.value?.role || null)
  const isAdmin = computed(() => userRole.value === 'admin')
  const isModerator = computed(() => userRole.value === 'moderator')

  // Helper to set loading state
  const setLoading = (loading: boolean) => {
    isLoading.value = loading
    if (loading) {
      error.value = null
    }
  }

  // Helper to handle errors
  const handleError = (err: AuthError | Error | any) => {
    isLoading.value = false
    let errorMessage = 'An unexpected error occurred'

    if (err instanceof Error) {
      errorMessage = err.message
    }
    else if (err.message) {
      errorMessage = err.message
    }

    error.value = errorMessage
    toast.error('Authentication Error', errorMessage)
    console.error('Auth error:', err)
  }

  // Actions
  const login = async (credentials: LoginForm) => {
    setLoading(true)
    try {
      const response = await authService.login(credentials)
      user.value = response.user
      error.value = null
      toast.success('Welcome back!', SUCCESS_MESSAGES.LOGIN)
      return { success: true, message: SUCCESS_MESSAGES.LOGIN }
    }
    catch (err) {
      handleError(err)
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  const register = async (userData: RegisterForm) => {
    setLoading(true)
    try {
      const response = await authService.register(userData)
      user.value = response.user
      error.value = null
      return { success: true, message: response.message || SUCCESS_MESSAGES.REGISTER }
    }
    catch (err) {
      handleError(err)
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await authService.logout()
      user.value = null
      error.value = null
      return { success: true, message: SUCCESS_MESSAGES.LOGOUT }
    }
    catch (err) {
      handleError(err)
      // Even if logout fails on server, clear local state
      user.value = null
    }
    finally {
      isLoading.value = false
    }
  }

  const fetchProfile = async () => {
    if (!authService.isAuthenticated()) {
      return
    }

    setLoading(true)
    try {
      const profile = await authService.getProfile()
      user.value = profile
      error.value = null
    }
    catch (err) {
      handleError(err)
      // If profile fetch fails, user might be unauthenticated
      if ((err as any)?.status === 401) {
        user.value = null
      }
    }
    finally {
      isLoading.value = false
    }
  }

  const updateProfile = async (data: UpdateProfileRequest) => {
    setLoading(true)
    try {
      const updatedUser = await authService.updateProfile(data)
      user.value = updatedUser
      error.value = null
      return { success: true, message: SUCCESS_MESSAGES.PROFILE_UPDATED }
    }
    catch (err) {
      handleError(err)
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  const changePassword = async (data: ChangePasswordRequest) => {
    setLoading(true)
    try {
      await authService.changePassword(data)
      error.value = null
      return { success: true, message: 'Password changed successfully' }
    }
    catch (err) {
      handleError(err)
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  const refreshToken = async () => {
    try {
      await authService.refreshToken()
      return true
    }
    catch {
      // If refresh fails, clear user state
      user.value = null
      return false
    }
  }

  // Initialize auth state on store creation
  const initializeAuth = async () => {
    if (authService.isAuthenticated()) {
      await fetchProfile()
    }
  }

  // Clear all auth state
  const clearAuth = () => {
    user.value = null
    error.value = null
    isLoading.value = false
  }

  // Check if user has specific role
  const hasRole = (role: string) => {
    return userRole.value === role
  }

  // Check if user has any of the specified roles
  const hasAnyRole = (roles: string[]) => {
    return roles.includes(userRole.value || '')
  }

  return {
    // State
    user,
    isLoading,
    error,

    // Getters
    isAuthenticated,
    userRole,
    isAdmin,
    isModerator,

    // Actions
    login,
    register,
    logout,
    fetchProfile,
    updateProfile,
    changePassword,
    refreshToken,
    initializeAuth,
    clearAuth,
    hasRole,
    hasAnyRole,
  }
})

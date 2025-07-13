import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'

import type { LoginInput, RegisterInput } from '../types/schemas'

import { useCurrentUser, useLogout } from '../api/auth'
import { useLogin } from '../api/login'
import { useRegister } from '../api/register'
import { useAuthStore } from '../stores/auth'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  // Queries and mutations
  const { data: currentUser, isLoading: isUserLoading, error: userError } = useCurrentUser()
  const loginMutation = useLogin()
  const registerMutation = useRegister()
  const logoutMutation = useLogout()

  // Update store when current user data changes
  watch(currentUser, (user) => {
    if (user) {
      authStore.setUser(user)
    }
  }, { immediate: true })

  // Login function
  const login = async (credentials: LoginInput) => {
    try {
      authStore.setLoading(true)
      const result = await loginMutation.mutateAsync(credentials)
      authStore.setUser(result.user)
      router.push('/dashboard')
      return result
    }
    catch (error) {
      authStore.setError(error instanceof Error ? error.message : 'Login failed')
      throw error
    }
    finally {
      authStore.setLoading(false)
    }
  }

  // Register function
  const register = async (userData: RegisterInput) => {
    try {
      authStore.setLoading(true)
      const result = await registerMutation.mutateAsync(userData)
      authStore.setUser(result.user)
      router.push('/dashboard')
      return result
    }
    catch (error) {
      authStore.setError(error instanceof Error ? error.message : 'Registration failed')
      throw error
    }
    finally {
      authStore.setLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await logoutMutation.mutateAsync()
      authStore.clearAuth()
    }
    catch (error) {
      console.error('Logout error:', error)
      // Even if logout API fails, clear local state
      authStore.clearAuth()
    }
  }

  // Check if user has specific permission
  const hasPermission = (permission: string) => {
    return authStore.hasPermission(permission)
  }

  // Require authentication guard
  const requireAuth = () => {
    if (!authStore.isAuthenticated) {
      router.push('/auth/login')
      return false
    }
    return true
  }

  // Require admin guard
  const requireAdmin = () => {
    if (!authStore.isAuthenticated) {
      router.push('/auth/login')
      return false
    }
    if (!authStore.isAdmin) {
      router.push('/dashboard')
      return false
    }
    return true
  }

  return {
    // State
    user: computed(() => authStore.user),
    isAuthenticated: computed(() => authStore.isAuthenticated),
    isAdmin: computed(() => authStore.isAdmin),
    isLoading: computed(() => authStore.isLoading || isUserLoading.value),
    error: computed(() => authStore.error || userError.value?.message),

    // Actions
    login,
    register,
    logout,
    hasPermission,
    requireAuth,
    requireAdmin,

    // Mutation states
    isLoginLoading: computed(() => loginMutation.isPending.value),
    isRegisterLoading: computed(() => registerMutation.isPending.value),
    isLogoutLoading: computed(() => logoutMutation.isPending.value)
  }
}

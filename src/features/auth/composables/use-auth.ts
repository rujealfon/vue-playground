import { computed } from 'vue'

import type { LoginForm, RegisterForm } from '../types'

import { useAuthStore } from '../stores/auth-store'

export function useAuth() {
  const authStore = useAuthStore()

  return {
    // State
    user: authStore.user,
    token: authStore.token,
    isAuthenticated: authStore.isAuthenticated,
    isLoading: authStore.isLoading,

    // Errors
    loginError: authStore.loginError,
    registerError: authStore.registerError,
    userError: authStore.userError,

    // Actions
    login: (credentials: LoginForm) => authStore.login(credentials),
    register: (userData: RegisterForm) => authStore.register(userData),
    logout: () => authStore.logout(),
    getCurrentUser: () => authStore.getCurrentUser(),
    refreshToken: () => authStore.refreshAuthToken(),
    clearAuth: () => authStore.clearAuthData()
  }
}

// Helper function to check if user has specific role
export function useAuthRole() {
  const authStore = useAuthStore()

  const hasRole = (role: string) => {
    return authStore.isAuthenticated && authStore.user?.role === role
  }

  const isAdmin = computed(() => hasRole('admin'))
  const isUser = computed(() => hasRole('user'))

  return {
    hasRole,
    isAdmin,
    isUser
  }
}

// Helper function for route guards
export function useAuthGuard() {
  const authStore = useAuthStore()

  const canAccess = (requireAuth = true) => {
    if (authStore.isLoading)
      return false
    return requireAuth ? authStore.isAuthenticated : true
  }

  const requireAuth = () => {
    return authStore.isAuthenticated
  }

  const requireGuest = () => {
    return !authStore.isAuthenticated
  }

  return {
    canAccess,
    requireAuth,
    requireGuest,
    isLoading: authStore.isLoading
  }
}

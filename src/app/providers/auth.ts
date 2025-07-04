import { useUserStore } from '@/entities/user'
import { authApi } from '@/shared/api'

export async function initializeAuth() {
  const userStore = useUserStore()
  const token = localStorage.getItem('auth_token')

  if (!token) {
    return
  }

  try {
    userStore.setLoading(true)
    const user = await authApi.validateToken(token)
    userStore.setUser(user)
  }
  catch {
    // Token is invalid, remove it
    localStorage.removeItem('auth_token')
    userStore.clearUser()
  }
  finally {
    userStore.setLoading(false)
  }
}

export function useAuthGuards() {
  const userStore = useUserStore()

  const requireAuth = () => {
    if (!userStore.isAuthenticated) {
      return '/login'
    }
    return true
  }

  const requireGuest = () => {
    if (userStore.isAuthenticated) {
      return '/'
    }
    return true
  }

  return {
    requireAuth,
    requireGuest
  }
}

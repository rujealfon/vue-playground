import { createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

import { useAuthStore } from '@/features/auth/stores/auth.store'

// Define route permissions
const ROUTE_PERMISSIONS = {
  '/dashboard/users': ['admin'], // Only admins can access user management
  // Add more route-specific permissions as needed
} as Record<string, string[]>

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Route Guard for Authentication
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Check if route requires authentication (dashboard routes)
  const requiresAuth = to.path.startsWith('/dashboard')

  // If route requires auth and user is not authenticated
  if (requiresAuth && !authStore.isAuthenticated) {
    // Store the intended destination for redirect after login
    const redirectPath = to.fullPath !== '/dashboard' ? to.fullPath : undefined

    // Redirect to login with query parameter for redirect
    next({
      path: '/login',
      query: redirectPath ? { redirect: redirectPath } : undefined,
    })
    return
  }

  // Check role-based permissions for specific routes
  if (requiresAuth && authStore.isAuthenticated) {
    const requiredRoles = ROUTE_PERMISSIONS[to.path]
    if (requiredRoles && authStore.userRole) {
      const hasPermission = requiredRoles.includes(authStore.userRole)
      if (!hasPermission) {
        // Redirect to main dashboard if user doesn't have permission
        console.warn(`Access denied to ${to.path}. Required roles: ${requiredRoles.join(', ')}`)
        next('/dashboard')
        return
      }
    }
  }

  // If user is authenticated and trying to access login page
  if (to.path === '/login' && authStore.isAuthenticated) {
    // Check if there's a redirect query parameter
    const redirectPath = to.query.redirect as string
    if (redirectPath && redirectPath.startsWith('/dashboard')) {
      // Redirect to the intended dashboard page
      next(redirectPath)
    }
    else {
      // Redirect to main dashboard
      next('/dashboard')
    }
    return
  }

  // Allow navigation
  next()
})

export default router

if (!import.meta.hot) {
  handleHotUpdate(router)
}

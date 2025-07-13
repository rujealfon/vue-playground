import { createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

import { requireAuth, requireGuest } from '@/features/auth/utils/auth-guards'

// Add manual routes for auth pages and dashboard
const manualRoutes = [
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('@/pages/auth/login.vue'),
    beforeEnter: requireGuest
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('@/pages/auth/register.vue'),
    beforeEnter: requireGuest
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/dashboard.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/profile.vue'),
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes, ...manualRoutes]
})

export default router

if (!import.meta.hot) {
  handleHotUpdate(router)
}

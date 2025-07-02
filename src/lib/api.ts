import { ofetch } from 'ofetch'

import { useAuthStore } from '@/features/auth/stores/auth'

export const api = ofetch.create({
  baseURL: '/api', // Can be overwritten by environment variables
  async onRequest({ options }) {
    const authStore = useAuthStore()
    const token = authStore.token

    options.headers = new Headers(options.headers)

    // Add Authorization header if a token exists
    if (token) {
      options.headers.set('Authorization', `Bearer ${token}`)
    }
  },
  async onResponseError({ response }) {
    // Handle global errors
    if (response.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      // Optionally redirect to the login page
      // window.location.pathname = '/login'
    }
  }
})

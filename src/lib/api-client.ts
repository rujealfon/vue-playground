import { ofetch } from 'ofetch'

import type { ApiResponse } from '@/types'

import { env } from '@/config/env'

export const apiClient = ofetch.create({
  baseURL: env.API_URL,
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  onRequest({ options }) {
    // Add auth token if available
    const token = localStorage.getItem('auth-token')
    if (token) {
      if (!options.headers)
        options.headers = new Headers()
      if (options.headers instanceof Headers) {
        options.headers.set('Authorization', `Bearer ${token}`)
      }
      else {
        // @ts-expect-error - ofetch headers typing issue
        options.headers.Authorization = `Bearer ${token}`
      }
    }
  },
  onResponseError({ response }) {
    // Handle global error responses
    if (response.status === 401) {
      // Clear auth state and redirect to login
      localStorage.removeItem('auth-token')
      window.location.href = '/auth/login'
    }

    // Log errors in development
    if (env.DEV) {
      console.error('API Error:', response._data)
    }
  }
})

// Typed API client methods
export const api = {
  get: <T>(url: string, options?: any) =>
    apiClient<ApiResponse<T>>(url, { method: 'GET', ...options }),

  post: <T>(url: string, body?: any, options?: any) =>
    apiClient<ApiResponse<T>>(url, { method: 'POST', body, ...options }),

  put: <T>(url: string, body?: any, options?: any) =>
    apiClient<ApiResponse<T>>(url, { method: 'PUT', body, ...options }),

  delete: <T>(url: string, options?: any) =>
    apiClient<ApiResponse<T>>(url, { method: 'DELETE', ...options }),

  patch: <T>(url: string, body?: any, options?: any) =>
    apiClient<ApiResponse<T>>(url, { method: 'PATCH', body, ...options })
}

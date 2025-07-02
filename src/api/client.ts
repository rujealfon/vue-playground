import { ofetch } from 'ofetch'

import type { ApiError } from '@/features/auth/types'

// API Base URL - you can change this to your actual API endpoint
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com'

// Create the main API client
export const apiClient = ofetch.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  // Request interceptor
  async onRequest({ request, options }) {
    // Add auth token if available
    const token = localStorage.getItem('auth-token')
    if (token) {
      const headers = new Headers(options.headers)
      headers.set('Authorization', `Bearer ${token}`)
      options.headers = headers
    }

    // Log request for debugging
    console.warn(`🚀 API Request: ${options.method || 'GET'} ${request}`)
  },

  // Response interceptor
  async onResponse({ request, response }) {
    // Log successful responses
    console.warn(`✅ API Response: ${response.status} ${request}`)
  },

  // Error interceptor
  async onResponseError({ request, response }) {
    console.error(`❌ API Error: ${response.status} ${request}`)

    const error: ApiError = {
      message: 'An error occurred',
      statusCode: response.status
    }

    try {
      const errorData = await response._data
      error.message = errorData?.message || error.message
      error.errors = errorData?.errors
    }
    catch {
      // Fallback error messages
      switch (response.status) {
        case 401:
          error.message = 'Unauthorized - Please login again'
          // Clear stored auth data
          localStorage.removeItem('auth-token')
          localStorage.removeItem('auth-refresh-token')
          localStorage.removeItem('auth-user')
          break
        case 403:
          error.message = 'Forbidden - You do not have permission'
          break
        case 404:
          error.message = 'Resource not found'
          break
        case 422:
          error.message = 'Validation error'
          break
        case 500:
          error.message = 'Internal server error'
          break
        default:
          error.message = 'Network error occurred'
      }
    }

    throw error
  }
})

// Auth API client (for login/register endpoints that don't need auth)
export const authApiClient = ofetch.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  async onRequest({ request, options }) {
    console.warn(`🔐 Auth Request: ${options.method || 'GET'} ${request}`)
  },
  async onResponse({ request, response }) {
    console.warn(`✅ Auth Response: ${response.status} ${request}`)
  },
  async onResponseError({ request, response }) {
    console.error(`❌ Auth Error: ${response.status} ${request}`)

    const error: ApiError = {
      message: 'Authentication failed',
      statusCode: response.status
    }

    try {
      const errorData = await response._data
      error.message = errorData?.message || error.message
      error.errors = errorData?.errors
    }
    catch {
      switch (response.status) {
        case 401:
          error.message = 'Invalid credentials'
          break
        case 422:
          error.message = 'Please check your input'
          break
        default:
          error.message = 'Authentication service unavailable'
      }
    }

    throw error
  }
})

// Export convenience methods
export const api = {
  get: <T>(url: string, options?: any) => apiClient<T>(url, { method: 'GET', ...options }),
  post: <T>(url: string, data?: any, options?: any) => apiClient<T>(url, { method: 'POST', body: data, ...options }),
  put: <T>(url: string, data?: any, options?: any) => apiClient<T>(url, { method: 'PUT', body: data, ...options }),
  patch: <T>(url: string, data?: any, options?: any) => apiClient<T>(url, { method: 'PATCH', body: data, ...options }),
  delete: <T>(url: string, options?: any) => apiClient<T>(url, { method: 'DELETE', ...options })
}

export const authApi = {
  post: <T>(url: string, data?: any, options?: any) => authApiClient<T>(url, { method: 'POST', body: data, ...options })
}

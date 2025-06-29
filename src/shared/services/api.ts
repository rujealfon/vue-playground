import { $fetch } from 'ofetch'

// Create a custom fetch instance with interceptors
export const api = $fetch.create({
  // Base URL - you can set this to your API endpoint
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',

  // Default headers
  headers: {
    'Content-Type': 'application/json',
  },

  // Request interceptor
  onRequest({ request, options }) {
    console.log('[fetch request]', request, options)

    // Add authentication token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      options.headers = new Headers(options.headers)
      options.headers.set('Authorization', `Bearer ${token}`)
    }
  },

  // Request error interceptor
  onRequestError({ request, error }) {
    console.error('[fetch request error]', request, error)
  },

  // Response interceptor
  onResponse({ request, response }) {
    console.log('[fetch response]', request, response.status, response.body)
  },

  // Response error interceptor
  onResponseError({ request, response }) {
    console.error('[fetch response error]', request, response.status, response.body)

    // Handle different error status codes
    switch (response.status) {
      case 401:
        // Redirect to login or refresh token
        console.warn('Unauthorized - clearing auth token')
        localStorage.removeItem('auth_token')
        // You might want to redirect to login page here
        break
      case 403:
        console.warn('Forbidden access')
        break
      case 404:
        console.warn('Resource not found')
        break
      case 500:
        console.error('Server error')
        break
    }
  },
})

// Utility functions for common HTTP methods
export const apiUtils = {
  // GET request
  get: <T = any>(url: string, options = {}) => {
    return api<T>(url, { method: 'GET', ...options })
  },

  // POST request
  post: <T = any>(url: string, data?: any, options = {}) => {
    return api<T>(url, { method: 'POST', body: data, ...options })
  },

  // PUT request
  put: <T = any>(url: string, data?: any, options = {}) => {
    return api<T>(url, { method: 'PUT', body: data, ...options })
  },

  // PATCH request
  patch: <T = any>(url: string, data?: any, options = {}) => {
    return api<T>(url, { method: 'PATCH', body: data, ...options })
  },

  // DELETE request
  delete: <T = any>(url: string, options = {}) => {
    return api<T>(url, { method: 'DELETE', ...options })
  },
}

// Example usage in a composable
export function useApi() {
  // Set authentication token
  const setAuthToken = (token: string) => {
    localStorage.setItem('auth_token', token)
  }

  // Clear authentication token
  const clearAuthToken = () => {
    localStorage.removeItem('auth_token')
  }

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem('auth_token')
  }

  return {
    api,
    apiUtils,
    setAuthToken,
    clearAuthToken,
    isAuthenticated,
  }
}

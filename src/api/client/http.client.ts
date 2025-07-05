import type { ApiResponse, RequestConfig } from '@/api/types'

class HttpClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor(baseURL = '/api') {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    }
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('accessToken')
  }

  private getHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers = { ...this.defaultHeaders, ...customHeaders }
    const token = this.getAuthToken()

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    return headers
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: 'An error occurred',
        success: false
      }))
      throw new Error(errorData.message || 'Request failed')
    }

    return response.json()
  }

  async get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const headers = this.getHeaders(config?.headers)
    const params = new URLSearchParams(config?.params).toString()
    const fullUrl = `${this.baseURL}${url}${params ? `?${params}` : ''}`

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers
    })

    return this.handleResponse<T>(response)
  }

  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const headers = this.getHeaders(config?.headers)

    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })

    return this.handleResponse<T>(response)
  }

  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const headers = this.getHeaders(config?.headers)

    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    })

    return this.handleResponse<T>(response)
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const headers = this.getHeaders(config?.headers)

    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'DELETE',
      headers
    })

    return this.handleResponse<T>(response)
  }
}

export const httpClient = new HttpClient()
export default httpClient

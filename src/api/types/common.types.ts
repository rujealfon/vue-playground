export type ApiResponse<T = any> = {
  data: T
  message?: string
  success: boolean
}

export type ApiError = {
  message: string
  code?: string
  field?: string
}

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type RequestConfig = {
  method?: ApiMethod
  headers?: Record<string, string>
  params?: Record<string, any>
}

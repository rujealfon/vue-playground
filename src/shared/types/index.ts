// Shared TypeScript types and interfaces

export type Theme = 'light' | 'dark'

export type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

export type ApiResponse<T = any> = {
  data: T
  message: string
  success: boolean
}

export type PaginationParams = {
  page: number
  limit: number
  sort?: string
  order?: 'asc' | 'desc'
}

export type PaginatedResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
} & ApiResponse<T[]>

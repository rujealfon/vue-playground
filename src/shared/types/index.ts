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

// Pagination types removed - unused

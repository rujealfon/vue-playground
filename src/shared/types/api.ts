// Common API response types
export type ApiResponse<T = any> = {
  data: T
  message?: string
  success: boolean
}

export type PaginatedResponse<T = any> = {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Common entity types
export type BaseEntity = {
  id: number | string
  createdAt: string
  updatedAt: string
}

// Error types
export type AppError = {
  code: string
  message: string
  details?: any
}

// Generic CRUD operations
export type CrudOperations<T> = {
  create: (data: Omit<T, keyof BaseEntity>) => Promise<T>
  read: (id: string | number) => Promise<T>
  update: (id: string | number, data: Partial<T>) => Promise<T>
  delete: (id: string | number) => Promise<void>
  list: (params?: any) => Promise<PaginatedResponse<T>>
}

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

// User related types
export type User = {
  name: string
  email: string
  avatar?: string
  role: UserRole
  isActive: boolean
} & BaseEntity

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

// Auth related types
export type AuthTokens = {
  accessToken: string
  refreshToken: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterData = {
  name: string
  confirmPassword: string
} & LoginCredentials

// Common UI types
export type SelectOption = {
  label: string
  value: string | number
  disabled?: boolean
}

export type TableColumn = {
  key: string
  label: string
  sortable?: boolean
  width?: string
}

// Form types
export type FormField = {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'checkbox'
  required?: boolean
  options?: SelectOption[]
  placeholder?: string
  validation?: any
}

// Navigation types
export type NavItem = {
  label: string
  to: string
  icon?: string
  children?: NavItem[]
  requiresAuth?: boolean
  roles?: UserRole[]
}

// Error types
export type AppError = {
  code: string
  message: string
  details?: any
}

// Loading states
export type LoadingState = {
  isLoading: boolean
  error: string | null
}

// Generic CRUD operations
export type CrudOperations<T> = {
  create: (data: Omit<T, keyof BaseEntity>) => Promise<T>
  read: (id: string | number) => Promise<T>
  update: (id: string | number, data: Partial<T>) => Promise<T>
  delete: (id: string | number) => Promise<void>
  list: (params?: any) => Promise<PaginatedResponse<T>>
}

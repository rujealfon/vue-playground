export type User = {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  avatar?: string
  createdAt: string
  updatedAt: string
}

export type ApiResponse<T = unknown> = {
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
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export type DashboardStats = {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  growth: number
}

export type Activity = {
  id: string
  type: 'login' | 'logout' | 'update' | 'create'
  description: string
  userId: string
  createdAt: string
}

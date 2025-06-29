import type { BaseEntity } from '@/shared/types'

// Dashboard stats types
export type DashboardStats = {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  monthlyGrowth: number
  recentSignups: number
  pendingTasks: number
}

// Activity types
export type ActivityType = 'login' | 'signup' | 'purchase' | 'update' | 'delete'

export type RecentActivity = BaseEntity & {
  userId: string
  userName: string
  userEmail: string
  type: ActivityType
  description: string
  metadata?: Record<string, any>
}

// Chart data types
export type ChartDataPoint = {
  label: string
  value: number
  date?: string
}

export type ChartData = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string[]
    borderColor?: string
    fill?: boolean
  }[]
}

// Widget types
export type WidgetType = 'stat' | 'chart' | 'list' | 'progress'

export type DashboardWidget = {
  id: string
  title: string
  type: WidgetType
  size: 'small' | 'medium' | 'large'
  position: { x: number, y: number }
  data: any
  config?: Record<string, any>
}

// Dashboard state
export type DashboardState = {
  stats: DashboardStats | null
  recentActivity: RecentActivity[]
  widgets: DashboardWidget[]
  isLoading: boolean
  error: string | null
}

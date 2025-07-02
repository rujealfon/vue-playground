import type { z } from 'zod'

import {
  activitySchema,
  analyticsDataSchema,
  dashboardFilterSchema,
  dashboardStatSchema,
  quickActionSchema
} from '../schemas'

// Re-export schemas
export {
  activitySchema,
  analyticsDataSchema,
  dashboardFilterSchema,
  dashboardStatSchema,
  quickActionSchema
}

// Inferred types from schemas
export type DashboardStat = z.infer<typeof dashboardStatSchema>
export type Activity = z.infer<typeof activitySchema>
export type DashboardFilter = z.infer<typeof dashboardFilterSchema>
export type AnalyticsData = z.infer<typeof analyticsDataSchema>
export type QuickAction = z.infer<typeof quickActionSchema>

// Dashboard state interface
export type DashboardState = {
  stats: DashboardStat[]
  activities: Activity[]
  isLoading: boolean
  lastUpdated: Date | null
  filters: DashboardFilter
}

// Dashboard widget types
export type DashboardWidget = {
  id: string
  title: string
  component: string
  size: 'sm' | 'md' | 'lg' | 'xl'
  position: {
    x: number
    y: number
  }
  props?: Record<string, any>
  isVisible: boolean
}

// Chart data types
export type ChartPoint = {
  x: string | number
  y: number
  label?: string
}

export type ChartDataset = {
  label: string
  data: ChartPoint[]
  color?: string
  type?: 'line' | 'bar' | 'area'
}

// Notification types
export type DashboardNotification = {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  actionUrl?: string
}

// Export types
export type ExportOptions = {
  format: 'csv' | 'xlsx' | 'pdf'
  dateRange: {
    start: Date
    end: Date
  }
  includeCharts: boolean
  sections: string[]
}

import { z } from 'zod'

// Dashboard stats schema
export const dashboardStatSchema = z.object({
  title: z.string(),
  value: z.string(),
  icon: z.string(),
  trend: z.object({
    value: z.number(),
    isPositive: z.boolean()
  })
})

// Activity schema
export const activitySchema = z.object({
  id: z.union([z.string(), z.number()]),
  description: z.string(),
  timestamp: z.string(),
  icon: z.string(),
  type: z.enum(['login', 'registration', 'report', 'update', 'delete']).optional(),
  userId: z.string().optional()
})

// Dashboard filter schema
export const dashboardFilterSchema = z.object({
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime()
  }).optional(),
  category: z.enum(['all', 'users', 'sales', 'revenue', 'activity']).default('all'),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.enum(['date', 'name', 'value']).default('date'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

// Analytics data schema
export const analyticsDataSchema = z.object({
  period: z.enum(['today', 'week', 'month', 'year']),
  metrics: z.object({
    totalUsers: z.number(),
    activeUsers: z.number(),
    revenue: z.number(),
    conversionRate: z.number()
  }),
  chartData: z.array(
    z.object({
      date: z.string(),
      value: z.number(),
      label: z.string().optional()
    })
  )
})

// Quick action schema
export const quickActionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  action: z.string(),
  requiresPermission: z.array(z.string()).optional(),
  isEnabled: z.boolean().default(true)
})

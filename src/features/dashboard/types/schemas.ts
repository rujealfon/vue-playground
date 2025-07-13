import { z } from 'zod'

export const dashboardStatsSchema = z.object({
  totalUsers: z.number(),
  activeUsers: z.number(),
  totalRevenue: z.number(),
  growth: z.number()
})

export const activitySchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['login', 'logout', 'update', 'create']),
  description: z.string(),
  userId: z.string().uuid(),
  createdAt: z.string().datetime()
})

export const dashboardQuerySchema = z.object({
  period: z.enum(['day', 'week', 'month', 'year']).default('month'),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional()
})

export type DashboardStats = z.infer<typeof dashboardStatsSchema>
export type Activity = z.infer<typeof activitySchema>
export type DashboardQuery = z.infer<typeof dashboardQuerySchema>

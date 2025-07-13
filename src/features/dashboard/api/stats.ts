import { useQuery } from '@tanstack/vue-query'

import { API_ENDPOINTS } from '@/config/constants'
import { api } from '@/lib/api-client'

import type { DashboardQuery, DashboardStats } from '../types/schemas'

export async function getDashboardStats(params?: DashboardQuery): Promise<DashboardStats> {
  const response = await api.get<DashboardStats>(API_ENDPOINTS.DASHBOARD.STATS, {
    query: params
  })
  return response.data
}

export function useDashboardStats(params?: DashboardQuery) {
  return useQuery({
    queryKey: ['dashboard', 'stats', params],
    queryFn: () => getDashboardStats(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000 // 30 seconds
  })
}

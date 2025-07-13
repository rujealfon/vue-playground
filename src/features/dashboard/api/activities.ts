import { useQuery } from '@tanstack/vue-query'

import type { Pagination } from '@/schemas/common'
import type { PaginatedResponse } from '@/types'

import { API_ENDPOINTS } from '@/config/constants'
import { api } from '@/lib/api-client'

import type { Activity } from '../types/schemas'

export async function getActivities(params?: Pagination): Promise<PaginatedResponse<Activity>> {
  const response = await api.get<PaginatedResponse<Activity>>(API_ENDPOINTS.DASHBOARD.ACTIVITIES, {
    query: params
  })
  return response.data
}

export function useActivities(params?: Pagination) {
  return useQuery({
    queryKey: ['dashboard', 'activities', params],
    queryFn: () => getActivities(params),
    staleTime: 2 * 60 * 1000 // 2 minutes
  })
}

import { computed } from 'vue'

import type { DashboardQuery } from '../types/schemas'

import { useActivities } from '../api/activities'
import { useDashboardStats } from '../api/stats'

export function useDashboard(params?: DashboardQuery) {
  const { data: stats, isLoading: isStatsLoading, error: statsError } = useDashboardStats(params)
  const { data: activities, isLoading: isActivitiesLoading, error: activitiesError } = useActivities({ page: 1, limit: 10 })

  const isLoading = computed(() => isStatsLoading.value || isActivitiesLoading.value)
  const hasError = computed(() => !!statsError.value || !!activitiesError.value)

  const dashboardData = computed(() => ({
    stats: stats.value,
    activities: activities.value?.data || [],
    meta: activities.value?.meta
  }))

  return {
    data: dashboardData,
    isLoading,
    hasError,
    statsError,
    activitiesError
  }
}

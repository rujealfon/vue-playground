<script setup lang="ts">
import type { Activity } from '../types/schemas'

import { useActivities } from '../api/activities'

const { data: activitiesData, isLoading, error } = useActivities({ page: 1, limit: 10 })

function getActivityIcon(type: Activity['type']) {
  switch (type) {
    case 'login':
      return '🔐'
    case 'logout':
      return '🚪'
    case 'update':
      return '✏️'
    case 'create':
      return '➕'
    default:
      return '📝'
  }
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString))
}
</script>

<template>
  <div class="rounded-lg border bg-card shadow-sm">
    <div class="border-b p-6">
      <h3 class="text-lg font-semibold">
        Recent Activities
      </h3>
    </div>

    <div class="p-6">
      <div v-if="isLoading" class="py-8 text-center">
        <div
          class="
            mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary
          "
        />
        <p class="mt-2 text-sm text-muted-foreground">
          Loading activities...
        </p>
      </div>

      <div v-else-if="error" class="py-8 text-center">
        <p class="text-sm text-destructive">
          Failed to load activities
        </p>
      </div>

      <div v-else-if="!activitiesData?.data.length" class="py-8 text-center">
        <p class="text-sm text-muted-foreground">
          No activities found
        </p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="activity in activitiesData.data"
          :key="activity.id"
          class="flex items-start space-x-3"
        >
          <div class="text-lg">
            {{ getActivityIcon(activity.type) }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm">
              {{ activity.description }}
            </p>
            <p class="text-xs text-muted-foreground">
              {{ formatDate(activity.createdAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

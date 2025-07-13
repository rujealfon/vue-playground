<script setup lang="ts">
import ActivityList from '@/features/dashboard/components/activity-list.vue'
import StatsCard from '@/features/dashboard/components/stats-card.vue'
import { useDashboard } from '@/features/dashboard/composables/use-dashboard'

defineOptions({
  name: 'DashboardPage'
})

const { data, isLoading, hasError } = useDashboard()
</script>

<template>
  <div class="container mx-auto space-y-6 p-6">
    <div>
      <h1 class="text-3xl font-bold">
        Dashboard
      </h1>
      <p class="text-muted-foreground">
        Welcome back! Here's what's happening.
      </p>
    </div>

    <div v-if="isLoading" class="py-12 text-center">
      <div
        class="
          mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-primary
        "
      />
      <p class="mt-4 text-muted-foreground">
        Loading dashboard...
      </p>
    </div>

    <div v-else-if="hasError" class="py-12 text-center">
      <p class="text-destructive">
        Failed to load dashboard data
      </p>
    </div>

    <template v-else>
      <!-- Stats Grid -->
      <div
        class="
          grid grid-cols-1 gap-6
          md:grid-cols-2
          lg:grid-cols-4
        "
      >
        <StatsCard
          title="Total Users"
          :value="data?.stats?.totalUsers || 0"
          :change="5.2"
          icon="👥"
        />
        <StatsCard
          title="Active Users"
          :value="data?.stats?.activeUsers || 0"
          :change="12.5"
          icon="🟢"
        />
        <StatsCard
          title="Revenue"
          :value="data?.stats?.totalRevenue || 0"
          :change="-2.1"
          format="currency"
          icon="💰"
        />
        <StatsCard
          title="Growth"
          :value="data?.stats?.growth || 0"
          :change="8.3"
          format="percentage"
          icon="📈"
        />
      </div>

      <!-- Activities -->
      <div
        class="
          grid grid-cols-1 gap-6
          lg:grid-cols-3
        "
      >
        <div class="lg:col-span-2">
          <ActivityList />
        </div>
        <div class="space-y-6">
          <div class="rounded-lg border bg-card p-6">
            <h3 class="mb-4 text-lg font-semibold">
              Quick Actions
            </h3>
            <div class="space-y-3">
              <button
                class="
                  w-full rounded-md border p-3 text-left transition-colors
                  hover:bg-accent
                "
              >
                📊 View Analytics
              </button>
              <button
                class="
                  w-full rounded-md border p-3 text-left transition-colors
                  hover:bg-accent
                "
              >
                👥 Manage Users
              </button>
              <button
                class="
                  w-full rounded-md border p-3 text-left transition-colors
                  hover:bg-accent
                "
              >
                ⚙️ Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

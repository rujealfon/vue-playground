<script setup lang="ts">
import { BarChart3, FileText, LogIn, Settings, User, UserPlus } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/features/auth/composables/use-auth'
import DashboardStats from '@/features/dashboard/components/dashboard-stats.vue'

const router = useRouter()
const { user, logout } = useAuth()

async function handleLogout() {
  await logout()
  router.push('/login')
}

// Mock recent activities
const recentActivities = computed(() => [
  {
    id: 1,
    description: 'You logged in to your account',
    timestamp: '2 minutes ago',
    icon: LogIn
  },
  {
    id: 2,
    description: 'New user registration',
    timestamp: '15 minutes ago',
    icon: UserPlus
  },
  {
    id: 3,
    description: 'Report generated successfully',
    timestamp: '1 hour ago',
    icon: FileText
  }
])
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p class="mt-1 text-gray-600">
          Welcome back, {{ user?.name }}!
        </p>
      </div>
      <div class="flex items-center space-x-4">
        <Button variant="outline" @click="handleLogout">
          Logout
        </Button>
      </div>
    </div>

    <!-- Dashboard Stats -->
    <div class="mb-8">
      <h2 class="mb-4 text-xl font-semibold text-gray-900">
        Overview
      </h2>
      <DashboardStats />
    </div>

    <!-- Quick Actions -->
    <div class="mb-8">
      <h2 class="mb-4 text-xl font-semibold text-gray-900">
        Quick Actions
      </h2>
      <div
        class="
          grid grid-cols-1 gap-4
          md:grid-cols-3
        "
      >
        <Card
          class="
            cursor-pointer transition-shadow
            hover:shadow-md
          "
        >
          <CardHeader>
            <CardTitle class="flex items-center space-x-2">
              <User class="h-5 w-5" />
              <span>Manage Users</span>
            </CardTitle>
            <CardDescription>
              View and manage user accounts
            </CardDescription>
          </CardHeader>
        </Card>

        <Card
          class="
            cursor-pointer transition-shadow
            hover:shadow-md
          "
        >
          <CardHeader>
            <CardTitle class="flex items-center space-x-2">
              <Settings class="h-5 w-5" />
              <span>Settings</span>
            </CardTitle>
            <CardDescription>
              Configure application settings
            </CardDescription>
          </CardHeader>
        </Card>

        <Card
          class="
            cursor-pointer transition-shadow
            hover:shadow-md
          "
        >
          <CardHeader>
            <CardTitle class="flex items-center space-x-2">
              <BarChart3 class="h-5 w-5" />
              <span>Analytics</span>
            </CardTitle>
            <CardDescription>
              View detailed analytics
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>

    <!-- Recent Activity -->
    <div>
      <h2 class="mb-4 text-xl font-semibold text-gray-900">
        Recent Activity
      </h2>
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
          <CardDescription>
            Your recent actions and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="activity in recentActivities" :key="activity.id" class="
                flex items-start space-x-3
              "
            >
              <div class="flex-shrink-0">
                <div
                  class="
                    flex h-8 w-8 items-center justify-center rounded-full
                    bg-blue-100
                  "
                >
                  <component :is="activity.icon" class="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm text-gray-900">
                  {{ activity.description }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ activity.timestamp }}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here if needed */
</style>

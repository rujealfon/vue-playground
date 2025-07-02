<script setup lang="ts">
import { Activity, CreditCard, DollarSign, User } from 'lucide-vue-next'
import { computed } from 'vue'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Mock data - in a real app, this would come from an API
const stats = computed(() => [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    icon: DollarSign,
    trend: { value: 20.1, isPositive: true }
  },
  {
    title: 'Subscriptions',
    value: '+2350',
    icon: User,
    trend: { value: 180.1, isPositive: true }
  },
  {
    title: 'Sales',
    value: '+12,234',
    icon: CreditCard,
    trend: { value: 19, isPositive: true }
  },
  {
    title: 'Active Now',
    value: '+573',
    icon: Activity,
    trend: { value: 2.1, isPositive: false }
  }
])
</script>

<template>
  <div
    class="
      grid grid-cols-1 gap-6
      md:grid-cols-2
      lg:grid-cols-4
    "
  >
    <Card v-for="stat in stats" :key="stat.title">
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium">
          {{ stat.title }}
        </CardTitle>
        <component :is="stat.icon" class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ stat.value }}
        </div>
        <p class="text-xs text-muted-foreground">
          <span
            :class="stat.trend.isPositive ? 'text-green-600' : `text-red-600`"
          >
            {{ stat.trend.isPositive ? '+' : '' }}{{ stat.trend.value }}%
          </span>
          from last month
        </p>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
/* Add any custom styles here if needed */
</style>

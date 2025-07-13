<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  title: string
  value: number | string
  change?: number
  format?: 'number' | 'currency' | 'percentage'
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  format: 'number'
})

function formatValue(value: number | string, format: string) {
  if (typeof value === 'string')
    return value

  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value)
    case 'percentage':
      return `${value}%`
    default:
      return new Intl.NumberFormat('en-US').format(value)
  }
}

const changeColor = computed(() => {
  if (!props.change)
    return ''
  return props.change > 0 ? 'text-green-600' : 'text-red-600'
})

const changeIcon = computed(() => {
  if (!props.change)
    return ''
  return props.change > 0 ? '↗' : '↘'
})
</script>

<template>
  <div class="rounded-lg border bg-card p-6 shadow-sm">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-muted-foreground">
          {{ title }}
        </p>
        <p class="text-2xl font-bold">
          {{ formatValue(value, format) }}
        </p>
      </div>
      <div v-if="icon" class="text-2xl">
        {{ icon }}
      </div>
    </div>

    <div v-if="change !== undefined" class="mt-2 flex items-center">
      <span :class="changeColor" class="text-sm font-medium">
        {{ changeIcon }} {{ Math.abs(change) }}%
      </span>
      <span class="ml-1 text-sm text-muted-foreground">from last month</span>
    </div>
  </div>
</template>

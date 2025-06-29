<script setup lang="ts">
import { Button } from './button'

type Props = {
  title?: string
  message?: string
  showBackButton?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'Access Denied',
  message: 'You do not have permission to access this resource.',
  showBackButton: true
})

function goBack() {
  window.history.back()
}
</script>

<template>
  <div class="flex min-h-[400px] flex-col items-center justify-center text-center">
    <div class="mb-6 rounded-full bg-red-100 p-4">
      <svg
        class="h-12 w-12 text-red-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    </div>

    <h2 class="mb-4 text-2xl font-bold text-gray-900">
      {{ title }}
    </h2>

    <p class="mb-8 max-w-md text-gray-600">
      {{ message }}
    </p>

    <div v-if="showBackButton" class="space-x-4">
      <Button variant="outline" @click="goBack">
        Go Back
      </Button>
      <Button as="router-link" to="/dashboard">
        Dashboard
      </Button>
    </div>
  </div>
</template>

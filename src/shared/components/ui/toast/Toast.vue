<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-vue-next'

import type { Toast } from '@/shared/composables/use-toast'

export interface ToastProps {
  toast: Toast
}

export interface ToastEmits {
  dismiss: [id: string]
}

const props = defineProps<ToastProps>()
const emit = defineEmits<ToastEmits>()

// Get icon based on toast type
const icon = computed(() => {
  switch (props.toast.type) {
    case 'success':
      return CheckCircle
    case 'error':
      return XCircle
    case 'warning':
      return AlertTriangle
    case 'info':
      return Info
    default:
      return Info
  }
})

// Get styling based on toast type
const toastClasses = computed(() => {
  const baseClasses = 'relative flex w-full max-w-sm items-start rounded-lg border p-4 shadow-lg backdrop-blur-sm'

  switch (props.toast.type) {
    case 'success':
      return `${baseClasses} border-green-200 bg-green-50/90 text-green-800`
    case 'error':
      return `${baseClasses} border-red-200 bg-red-50/90 text-red-800`
    case 'warning':
      return `${baseClasses} border-yellow-200 bg-yellow-50/90 text-yellow-800`
    case 'info':
      return `${baseClasses} border-blue-200 bg-blue-50/90 text-blue-800`
    default:
      return `${baseClasses} border-gray-200 bg-white/90 text-gray-800`
  }
})

const iconClasses = computed(() => {
  switch (props.toast.type) {
    case 'success':
      return 'text-green-600'
    case 'error':
      return 'text-red-600'
    case 'warning':
      return 'text-yellow-600'
    case 'info':
      return 'text-blue-600'
    default:
      return 'text-gray-600'
  }
})

const handleDismiss = () => {
  emit('dismiss', props.toast.id)
}
</script>

<template>
  <div
    :class="toastClasses"
    role="alert"
    :aria-live="toast.type === 'error' ? 'assertive' : 'polite'"
  >
    <!-- Icon -->
    <div class="flex-shrink-0">
      <component
        :is="icon"
        :class="iconClasses"
        class="h-5 w-5"
      />
    </div>

    <!-- Content -->
    <div class="ml-3 flex-1">
      <div class="text-sm font-medium">
        {{ toast.title }}
      </div>
      <div
        v-if="toast.message"
        class="mt-1 text-sm opacity-90"
      >
        {{ toast.message }}
      </div>
    </div>

    <!-- Dismiss Button -->
    <div class="ml-4 flex flex-shrink-0">
      <button
        type="button"
        class="
          inline-flex rounded-md p-1.5 transition-colors
          hover:bg-black/10 focus:outline-none focus:ring-2
          focus:ring-offset-2
        "
        :class="{
          'focus:ring-green-600': toast.type === 'success',
          'focus:ring-red-600': toast.type === 'error',
          'focus:ring-yellow-600': toast.type === 'warning',
          'focus:ring-blue-600': toast.type === 'info'
        }"
        @click="handleDismiss"
      >
        <span class="sr-only">Dismiss</span>
        <X class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>

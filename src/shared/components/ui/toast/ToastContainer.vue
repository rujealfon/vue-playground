<script setup lang="ts">
import { ref } from 'vue'

import { useToast } from '@/shared/composables/use-toast'
import Toast from './Toast.vue'

// Use the global toast state
const { toasts, dismiss } = useToast()

// Handle toast dismiss
const handleDismiss = (id: string) => {
  dismiss(id)
}
</script>

<template>
  <!-- Toast Container -->
  <Teleport to="body">
    <div
      v-if="toasts.length > 0"
      class="
        pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6
        sm:items-start sm:p-6
      "
    >
      <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        <!-- Toast List with Transitions -->
        <TransitionGroup
          name="toast"
          tag="div"
          class="flex w-full flex-col items-center space-y-4 sm:items-end"
        >
          <div
            v-for="toast in toasts"
            :key="toast.id"
            class="pointer-events-auto"
          >
            <Toast
              :toast="toast"
              @dismiss="handleDismiss"
            />
          </div>
        </TransitionGroup>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Toast enter/leave animations */
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}

/* Mobile animations (slide up from bottom) */
@media (max-width: 640px) {
  .toast-enter-from {
    opacity: 0;
    transform: translateY(100%);
  }

  .toast-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
}
</style>

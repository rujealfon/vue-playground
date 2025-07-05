<script setup lang="ts">
import DefaultFooter from '@/components/navigation/default-footer.vue'
import DefaultHeader from '@/components/navigation/default-header.vue'

type Props = {
  title?: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- Header -->
    <DefaultHeader />

    <!-- Main Content -->
    <main class="flex-1 bg-gray-50">
      <slot />
    </main>

    <!-- Footer -->
    <DefaultFooter />
  </div>
</template>

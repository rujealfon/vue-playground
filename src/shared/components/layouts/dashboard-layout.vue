<script setup lang="ts">
import DashboardHeader from '@/shared/components/navigation/dashboard-header.vue'
import DashboardSidebar from '@/shared/components/navigation/dashboard-sidebar.vue'

type Props = {
  title?: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <DashboardSidebar />

    <!-- Main Content Area -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Dashboard Header -->
      <DashboardHeader />

      <!-- Main Content -->
      <main class="flex-1 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

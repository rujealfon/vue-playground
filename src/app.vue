<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import DashboardLayout from '@/shared/components/layouts/dashboard-layout.vue'
import DefaultLayout from '@/shared/components/layouts/default-layout.vue'

const route = useRoute()

// Dynamic layout selection based on route meta
const Layout = computed(() => {
  const layoutName = route.meta.layout || 'default'

  switch (layoutName) {
    case 'dashboard':
      return DashboardLayout
    case 'default':
    default:
      return DefaultLayout
  }
})
</script>

<template>
  <component :is="Layout">
    <RouterView />
  </component>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
}
</style>

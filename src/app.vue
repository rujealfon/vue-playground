<script setup lang="ts">
import { SiteFooter } from '@organisms/footer'
import { SiteHeader } from '@organisms/header'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

import { useAuthStore, useThemeStore } from '@/stores'

const authStore = useAuthStore()
const themeStore = useThemeStore()

onMounted(() => {
  // Initialize stores on app mount
  authStore.initializeAuth()
  themeStore.initializeTheme()
})
</script>

<template>
  <div class="relative flex min-h-screen flex-col">
    <SiteHeader />

    <main class="flex-1">
      <RouterView />
    </main>

    <SiteFooter />
  </div>
</template>

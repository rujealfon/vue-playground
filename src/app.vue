<script setup lang="ts">
import { RouterView } from 'vue-router'

import Navbar from '@/features/shared/components/navbar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <RouterView />
  </div>
</template>

<style scoped>
/* Global app styles can be added here if needed */
</style>

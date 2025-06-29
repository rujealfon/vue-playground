<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useAuthStore } from '@/features/auth'
import { Button } from '@/shared/components/ui/button'

const route = useRoute()
const authStore = useAuthStore()

const breadcrumbs = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  return pathSegments.map((segment, index) => {
    const pathParts = pathSegments.slice(0, index + 1)
    const path = `/${pathParts.join('/')}`
    const name = segment.charAt(0).toUpperCase() + segment.slice(1)
    return { name, path, isLast: index === pathSegments.length - 1 }
  })
})

const pageTitle = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1]
  return lastSegment ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) : 'Dashboard'
})
</script>

<template>
  <header class="border-b border-gray-200 bg-white px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Left side - Breadcrumbs and Page Title -->
      <div class="flex-1">
        <nav class="mb-1 flex items-center space-x-2 text-sm text-gray-500">
          <router-link
            v-for="breadcrumb in breadcrumbs"
            :key="breadcrumb.path"
            :to="breadcrumb.path"
            :class="breadcrumb.isLast ? 'font-medium text-gray-900' : `
              hover:text-gray-700
            `"
          >
            {{ breadcrumb.name }}
            <span v-if="!breadcrumb.isLast" class="mx-2">/</span>
          </router-link>
        </nav>
        <h1 class="text-2xl font-semibold text-gray-900">
          {{ pageTitle }}
        </h1>
      </div>

      <!-- Right side - Actions and User -->
      <div class="flex items-center space-x-4">
        <!-- Search -->
        <div
          class="
            relative hidden
            md:block
          "
        >
          <input
            type="text"
            placeholder="Search..."
            class="
              w-64 rounded-lg border border-gray-300 py-2 pr-4 pl-10
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500
              focus:outline-none
            "
          >
          <div
            class="
              pointer-events-none absolute inset-y-0 left-0 flex items-center
              pl-3
            "
          >
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Notifications -->
        <Button variant="ghost" size="sm" class="relative">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <!-- Notification badge -->
          <span class="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
        </Button>

        <!-- User Menu -->
        <div class="flex items-center space-x-3">
          <div
            class="
              hidden text-right
              sm:block
            "
          >
            <p class="text-sm font-medium text-gray-900">
              {{ authStore.user?.name }}
            </p>
            <p class="text-xs text-gray-500">
              {{ authStore.user?.role }}
            </p>
          </div>
          <button
            class="
              flex h-8 w-8 items-center justify-center rounded-full
              bg-gradient-to-r from-blue-500 to-purple-600
            "
          >
            <span class="text-sm font-medium text-white">
              {{ authStore.user?.name.charAt(0).toUpperCase() }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

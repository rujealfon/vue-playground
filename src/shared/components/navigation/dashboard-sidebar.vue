<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { useAuthStore } from '@/features/auth/stores/auth.store'
import Button from '@/shared/components/ui/button/Button.vue'

const route = useRoute()
const authStore = useAuthStore()
const isSidebarOpen = ref(false)

const navigationItems = computed(() => [
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: '📊',
    description: 'Overview and statistics',
  },
  {
    name: 'Analytics',
    to: '/dashboard/analytics',
    icon: '📈',
    description: 'Data insights and reports',
  },
  {
    name: 'Users',
    to: '/dashboard/users',
    icon: '👥',
    description: 'User management',
  },
  {
    name: 'Settings',
    to: '/dashboard/settings',
    icon: '⚙️',
    description: 'Application settings',
  },
])

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar() {
  isSidebarOpen.value = false
}

async function handleLogout() {
  try {
    await authStore.logout()
  }
  catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<template>
  <!-- Mobile overlay -->
  <div
    v-if="isSidebarOpen"
    class="
      bg-opacity-50 fixed inset-0 z-40 bg-black
      lg:hidden
    "
    @click="closeSidebar"
  />

  <!-- Sidebar -->
  <aside
    class="
      fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg
      transition-transform duration-200 ease-in-out
      lg:static lg:translate-x-0
    "
    :class="{
      'translate-x-0': isSidebarOpen,
      '-translate-x-full': !isSidebarOpen,
    }"
  >
    <div class="flex h-full flex-col">
      <!-- Sidebar Header -->
      <div class="flex h-16 items-center justify-between border-b px-6">
        <div class="flex items-center space-x-2">
          <div
            class="
              flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600
            "
          >
            <span class="text-sm font-bold text-white">VP</span>
          </div>
          <span class="font-semibold text-gray-900">Vue Playground</span>
        </div>

        <!-- Close button for mobile -->
        <Button
          variant="ghost"
          size="sm"
          class="lg:hidden"
          @click="closeSidebar"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 space-y-1 px-3 py-4">
        <div v-for="item in navigationItems" :key="item.name">
          <RouterLink
            :to="item.to"
            class="
              group flex w-full items-center rounded-lg px-3 py-2 text-sm
              font-medium transition-colors
              hover:bg-gray-100
            "
            :class="{
              'border-r-2 border-blue-700 bg-blue-50 text-blue-700': route.path === item.to,
              'text-gray-700 hover:text-gray-900': route.path !== item.to,
            }"
            @click="closeSidebar"
          >
            <span class="mr-3 text-lg">{{ item.icon }}</span>
            <div class="flex-1">
              <div class="font-medium">
                {{ item.name }}
              </div>
              <div
                class="
                  text-xs text-gray-500
                  group-hover:text-gray-700
                "
              >
                {{ item.description }}
              </div>
            </div>
          </RouterLink>
        </div>
      </nav>

      <!-- User Profile Section -->
      <div class="border-t p-4">
        <div v-if="authStore.user" class="flex items-center space-x-3">
          <div
            class="
              flex h-10 w-10 items-center justify-center rounded-full
              bg-gradient-to-r from-blue-500 to-purple-600
            "
          >
            <span class="text-sm font-medium text-white">
              {{ authStore.user.name.charAt(0).toUpperCase() }}
            </span>
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium text-gray-900">
              {{ authStore.user.name }}
            </p>
            <p class="truncate text-xs text-gray-500">
              {{ authStore.user.email }}
            </p>
            <div class="mt-1 flex items-center">
              <span
                class="
                  inline-flex items-center rounded-full px-2 py-0.5 text-xs
                  font-medium
                "
                :class="{
                  'bg-green-100 text-green-800': authStore.user.role === 'admin',
                  'bg-blue-100 text-blue-800': authStore.user.role === 'user',
                  'bg-purple-100 text-purple-800': authStore.user.role === 'moderator',
                }"
              >
                {{ authStore.user.role }}
              </span>
            </div>
          </div>
        </div>

        <div class="mt-4 space-y-2">
          <RouterLink to="/dashboard/profile" class="w-full">
            <Button variant="ghost" size="sm" class="w-full justify-start">
              <span class="mr-2">👤</span>
              Profile
            </Button>
          </RouterLink>

          <Button
            variant="ghost"
            size="sm"
            class="
              w-full justify-start text-red-600
              hover:bg-red-50 hover:text-red-700
            "
            :disabled="authStore.isLoading"
            @click="handleLogout"
          >
            <span class="mr-2">🚪</span>
            {{ authStore.isLoading ? 'Logging out...' : 'Logout' }}
          </Button>
        </div>
      </div>
    </div>
  </aside>

  <!-- Mobile menu button -->
  <div class="lg:hidden">
    <Button
      variant="ghost"
      size="sm"
      class="fixed top-4 left-4 z-40"
      @click="toggleSidebar"
    >
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </Button>
  </div>
</template>

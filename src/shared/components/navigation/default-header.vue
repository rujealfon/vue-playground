<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useAuthStore } from '@/features/auth/stores/auth.store'
import Button from '@/shared/components/ui/button/Button.vue'

const authStore = useAuthStore()
const showMobileMenu = ref(false)

const navigationItems = computed(() => [
  { name: 'Dashboard', to: '/dashboard', requiresAuth: false },
  { name: 'About', to: '/about', requiresAuth: false },
])

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value
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
  <header class="border-b bg-white shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo/Brand -->
        <div class="flex items-center space-x-4">
          <RouterLink
            to="/dashboard"
            class="
              text-xl font-bold text-gray-900
              hover:text-gray-700
            "
          >
            Vue Playground
          </RouterLink>
        </div>

        <!-- Navigation -->
        <nav
          class="
            hidden items-center space-x-6
            md:flex
          "
        >
          <RouterLink
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.to"
            class="
              text-gray-600 transition-colors
              hover:text-gray-900
            "
            active-class="text-blue-600 font-medium"
          >
            {{ item.name }}
          </RouterLink>
        </nav>

        <!-- User Actions -->
        <div class="flex items-center space-x-4">
          <div
            v-if="authStore.isAuthenticated" class="flex items-center space-x-4"
          >
            <!-- User Info -->
            <div
              v-if="authStore.user" class="
                hidden items-center space-x-2
                sm:flex
              "
            >
              <span class="text-sm text-gray-600">Welcome,</span>
              <span class="text-sm font-medium text-gray-900">
                {{ authStore.user.name }}
              </span>
              <span
                class="rounded-full px-2 py-1 text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-800': authStore.user.role === 'admin',
                  'bg-blue-100 text-blue-800': authStore.user.role === 'user',
                  'bg-purple-100 text-purple-800': authStore.user.role === 'moderator',
                }"
              >
                {{ authStore.user.role }}
              </span>
            </div>

            <!-- Logout Button -->
            <Button
              variant="outline"
              size="sm"
              :disabled="authStore.isLoading"
              @click="handleLogout"
            >
              {{ authStore.isLoading ? 'Logging out...' : 'Logout' }}
            </Button>
          </div>

          <!-- Login Button -->
          <div v-else>
            <RouterLink to="/login">
              <Button variant="default" size="sm">
                Login
              </Button>
            </RouterLink>
          </div>

          <!-- Mobile Menu Button -->
          <Button
            variant="ghost"
            size="sm"
            class="md:hidden"
            @click="toggleMobileMenu"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="showMobileMenu" class="
          border-t py-4
          md:hidden
        "
      >
        <nav class="flex flex-col space-y-2">
          <RouterLink
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.to"
            class="
              block rounded-md px-3 py-2 text-gray-600 transition-colors
              hover:bg-gray-50 hover:text-gray-900
            "
            active-class="text-blue-600 bg-blue-50 font-medium"
            @click="showMobileMenu = false"
          >
            {{ item.name }}
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import Button from '@/components/ui/button/Button.vue'
import { APP_CONFIG, ROUTES } from '@/config/constants'
import { useAuth } from '@/features/auth/composables/use-auth'

const route = useRoute()
const { user, isAuthenticated, logout, isLogoutLoading } = useAuth()
const isMobileMenuOpen = ref(false)

const navigation = computed(() => [
  { name: 'Home', href: ROUTES.HOME, current: route.path === ROUTES.HOME },
  { name: 'About', href: ROUTES.ABOUT, current: route.path === ROUTES.ABOUT },
  ...(isAuthenticated.value
    ? [
        { name: 'Dashboard', href: ROUTES.DASHBOARD, current: route.path === ROUTES.DASHBOARD },
        { name: 'Profile', href: ROUTES.PROFILE, current: route.path === ROUTES.PROFILE }
      ]
    : [])
])

async function handleLogout() {
  await logout()
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <header class="border-b bg-white shadow">
    <div
      class="
        mx-auto max-w-7xl px-4
        sm:px-6
        lg:px-8
      "
    >
      <div class="flex h-16 items-center justify-between">
        <!-- Logo and main navigation -->
        <div class="flex items-center space-x-8">
          <!-- Logo -->
          <RouterLink :to="ROUTES.HOME" class="flex items-center space-x-2">
            <div
              class="
                flex h-8 w-8 items-center justify-center rounded-md bg-primary
              "
            >
              <span class="text-lg font-bold text-white">V</span>
            </div>
            <span class="text-xl font-bold text-gray-900">{{ APP_CONFIG.APP_NAME }}</span>
          </RouterLink>

          <!-- Main Navigation -->
          <nav
            class="
              hidden space-x-8
              md:flex
            "
          >
            <RouterLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="rounded-md px-3 py-2 text-sm font-medium transition-colors" :class="[
                item.current
                  ? 'bg-primary text-white'
                  : `
                    text-gray-600
                    hover:bg-gray-100 hover:text-gray-900
                  `,
              ]"
            >
              {{ item.name }}
            </RouterLink>
          </nav>
        </div>

        <!-- User menu -->
        <div class="flex items-center space-x-4">
          <template v-if="isAuthenticated">
            <!-- User info -->
            <div
              class="
                hidden items-center space-x-3
                sm:flex
              "
            >
              <div class="text-sm">
                <p class="font-medium text-gray-900">
                  {{ user?.name }}
                </p>
                <p class="text-gray-500">
                  {{ user?.email }}
                </p>
              </div>
              <div
                class="
                  flex h-8 w-8 items-center justify-center rounded-full
                  bg-gray-300
                "
              >
                <span class="text-sm font-medium text-gray-700">
                  {{ user?.name?.charAt(0).toUpperCase() }}
                </span>
              </div>
            </div>

            <!-- Logout button -->
            <Button
              variant="outline"
              size="sm"
              :disabled="isLogoutLoading"
              @click="handleLogout"
            >
              {{ isLogoutLoading ? 'Logging out...' : 'Logout' }}
            </Button>
          </template>

          <template v-else>
            <!-- Auth buttons for non-authenticated users -->
            <div class="flex items-center space-x-3">
              <RouterLink :to="ROUTES.LOGIN">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </RouterLink>
              <RouterLink :to="ROUTES.REGISTER">
                <Button size="sm">
                  Sign Up
                </Button>
              </RouterLink>
            </div>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <Button variant="ghost" size="sm" @click="toggleMobileMenu">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>

      <!-- Mobile navigation menu -->
      <div v-show="isMobileMenuOpen" class="md:hidden">
        <div class="space-y-1 pt-2 pb-3">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="
              block rounded-md px-3 py-2 text-base font-medium transition-colors
            " :class="[
              item.current
                ? 'bg-primary text-white'
                : `
                  text-gray-600
                  hover:bg-gray-100 hover:text-gray-900
                `,
            ]"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </RouterLink>

          <!-- Mobile auth buttons -->
          <div
            v-if="!isAuthenticated" class="border-t border-gray-200 pt-4 pb-3"
          >
            <div class="flex flex-col space-y-3 px-3">
              <RouterLink :to="ROUTES.LOGIN" @click="isMobileMenuOpen = false">
                <Button variant="ghost" class="w-full justify-start">
                  Sign In
                </Button>
              </RouterLink>
              <RouterLink :to="ROUTES.REGISTER" @click="isMobileMenuOpen = false">
                <Button class="w-full">
                  Sign Up
                </Button>
              </RouterLink>
            </div>
          </div>

          <!-- Mobile user info -->
          <div v-else class="border-t border-gray-200 pt-4 pb-3">
            <div class="flex items-center px-3">
              <div
                class="
                  flex h-10 w-10 items-center justify-center rounded-full
                  bg-gray-300
                "
              >
                <span class="text-sm font-medium text-gray-700">
                  {{ user?.name?.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800">
                  {{ user?.name }}
                </div>
                <div class="text-sm font-medium text-gray-500">
                  {{ user?.email }}
                </div>
              </div>
            </div>
            <div class="mt-3 px-3">
              <Button
                variant="outline"
                class="w-full"
                :disabled="isLogoutLoading"
                @click="handleLogout"
              >
                {{ isLogoutLoading ? 'Logging out...' : 'Logout' }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

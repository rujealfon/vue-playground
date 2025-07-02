<script setup lang="ts">
import { LogOut, Menu, User } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/composables/use-auth'

const router = useRouter()
const { user, isAuthenticated, logout } = useAuth()

// Mobile menu state
const showMobileMenu = ref(false)

// Methods
async function handleLogout() {
  await logout()
  closeMobileMenu()
  router.push('/login')
}

function goToLogin() {
  closeMobileMenu()
  router.push('/login')
}

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value
}

function closeMobileMenu() {
  showMobileMenu.value = false
}
</script>

<template>
  <nav class="border-b bg-white shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo/Brand -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div
              class="
                flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600
              "
            >
              <span class="text-sm font-bold text-white">VP</span>
            </div>
            <span class="text-xl font-semibold text-gray-900">Vue Playground</span>
          </router-link>
        </div>

        <!-- Navigation Links -->
        <div
          class="
            hidden items-center space-x-6
            md:flex
          "
        >
          <router-link
            to="/"
            class="
              rounded-md px-3 py-2 text-sm font-medium text-gray-600
              transition-colors
              hover:text-gray-900
            "
            :class="{ 'bg-blue-50 text-blue-600': $route.path === '/' }"
          >
            Home
          </router-link>

          <router-link
            v-if="isAuthenticated"
            to="/dashboard"
            class="
              rounded-md px-3 py-2 text-sm font-medium text-gray-600
              transition-colors
              hover:text-gray-900
            "
            :class="{ 'bg-blue-50 text-blue-600': $route.path === '/dashboard' }"
          >
            Dashboard
          </router-link>

          <router-link
            to="/about"
            class="
              rounded-md px-3 py-2 text-sm font-medium text-gray-600
              transition-colors
              hover:text-gray-900
            "
            :class="{ 'bg-blue-50 text-blue-600': $route.path === '/about' }"
          >
            About
          </router-link>
        </div>

        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <div v-if="isAuthenticated" class="flex items-center space-x-3">
            <!-- User Info -->
            <div
              class="
                hidden items-center space-x-2
                sm:flex
              "
            >
              <div
                class="
                  flex h-8 w-8 items-center justify-center rounded-full
                  bg-gray-200
                "
              >
                <User class="h-4 w-4 text-gray-600" />
              </div>
              <span class="text-sm text-gray-700">{{ user?.name }}</span>
            </div>

            <!-- Logout Button -->
            <Button variant="outline" size="sm" @click="handleLogout">
              <LogOut class="mr-1 h-4 w-4" />
              Logout
            </Button>
          </div>

          <div v-else class="flex items-center space-x-2">
            <Button variant="ghost" size="sm" @click="goToLogin">
              Login
            </Button>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <Button variant="ghost" size="sm" @click="toggleMobileMenu">
            <Menu class="h-5 w-5" />
          </Button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="showMobileMenu" class="
          border-t border-gray-200 pt-4 pb-3
          md:hidden
        "
      >
        <div class="space-y-1">
          <router-link
            to="/"
            class="
              block rounded-md px-3 py-2 text-base font-medium text-gray-600
              hover:bg-gray-50 hover:text-gray-900
            "
            @click="closeMobileMenu"
          >
            Home
          </router-link>

          <router-link
            v-if="isAuthenticated"
            to="/dashboard"
            class="
              block rounded-md px-3 py-2 text-base font-medium text-gray-600
              hover:bg-gray-50 hover:text-gray-900
            "
            @click="closeMobileMenu"
          >
            Dashboard
          </router-link>

          <router-link
            to="/about"
            class="
              block rounded-md px-3 py-2 text-base font-medium text-gray-600
              hover:bg-gray-50 hover:text-gray-900
            "
            @click="closeMobileMenu"
          >
            About
          </router-link>
        </div>

        <div v-if="isAuthenticated" class="mt-3 border-t border-gray-200 pt-4">
          <div class="flex items-center px-3 py-2">
            <div
              class="
                mr-3 flex h-8 w-8 items-center justify-center rounded-full
                bg-gray-200
              "
            >
              <User class="h-4 w-4 text-gray-600" />
            </div>
            <span class="text-sm text-gray-700">{{ user?.name }}</span>
          </div>
          <Button variant="outline" size="sm" class="mx-3 mt-2" @click="handleLogout">
            <LogOut class="mr-1 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Add any custom styles here if needed */
</style>

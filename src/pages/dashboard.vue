<route lang="yaml">
meta:
  layout: dashboard
</route>

<script setup lang="ts">
import { useAuthStore } from '@/features/auth/stores/auth.store'
import { useCounterStore } from '@/features/dashboard/stores/counter'

const counterStore = useCounterStore()
const authStore = useAuthStore()

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
  <div class="p-6">
    <div class="mb-8">
      <h1 class="mb-2 text-3xl font-bold text-gray-900">
        Dashboard
      </h1>
      <p class="text-gray-600">
        Welcome to your feature-based Vue application!
      </p>
    </div>

    <!-- Dashboard Stats -->
    <div
      class="
        mb-8 grid grid-cols-1 gap-6
        md:grid-cols-2
        lg:grid-cols-4
      "
    >
      <div class="rounded-lg bg-white p-6 shadow-sm">
        <div class="flex items-center">
          <div class="rounded-lg bg-blue-100 p-3">
            <span class="text-2xl">👥</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">
              Active Users
            </p>
            <p class="text-2xl font-bold text-gray-900">
              1,234
            </p>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-white p-6 shadow-sm">
        <div class="flex items-center">
          <div class="rounded-lg bg-green-100 p-3">
            <span class="text-2xl">📊</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">
              Total Views
            </p>
            <p class="text-2xl font-bold text-gray-900">
              5,678
            </p>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-white p-6 shadow-sm">
        <div class="flex items-center">
          <div class="rounded-lg bg-yellow-100 p-3">
            <span class="text-2xl">📈</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">
              Growth Rate
            </p>
            <p class="text-2xl font-bold text-gray-900">
              12.5%
            </p>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-white p-6 shadow-sm">
        <div class="flex items-center">
          <div class="rounded-lg bg-purple-100 p-3">
            <span class="text-2xl">🎯</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">
              Conversion
            </p>
            <p class="text-2xl font-bold text-gray-900">
              8.2%
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div
      class="
        grid grid-cols-1 gap-6
        lg:grid-cols-2
      "
    >
      <!-- Auth Section -->
      <div class="rounded-lg bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-semibold">
          Authentication Status
        </h2>
        <div v-if="authStore.isAuthenticated" class="space-y-4">
          <div class="flex items-center space-x-2">
            <span class="h-3 w-3 rounded-full bg-green-500" />
            <span class="text-green-700">Authenticated</span>
          </div>
          <div v-if="authStore.user">
            <p><strong>Name:</strong> {{ authStore.user.name }}</p>
            <p><strong>Email:</strong> {{ authStore.user.email }}</p>
            <p><strong>Role:</strong> {{ authStore.user.role }}</p>
          </div>
          <button
            class="
              rounded bg-red-600 px-4 py-2 text-white
              hover:bg-red-700
            "
            :disabled="authStore.isLoading"
            @click="handleLogout"
          >
            {{ authStore.isLoading ? 'Logging out...' : 'Logout' }}
          </button>
        </div>
        <div v-else class="flex items-center space-x-2">
          <span class="h-3 w-3 rounded-full bg-red-500" />
          <span class="text-red-700">Not authenticated</span>
          <router-link
            to="/login"
            class="
              ml-4 text-blue-600
              hover:text-blue-800
            "
          >
            Login
          </router-link>
        </div>
      </div>

      <!-- Counter Feature Section -->
      <div class="rounded-lg bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-semibold">
          Counter Feature
        </h2>
        <div class="space-y-4">
          <div class="text-center text-2xl font-bold">
            Count: {{ counterStore.count }}
          </div>
          <div class="flex justify-center space-x-4">
            <button
              class="
                rounded bg-blue-600 px-4 py-2 text-white
                hover:bg-blue-700
              "
              @click="counterStore.increment"
            >
              Increment
            </button>
            <button
              class="
                rounded bg-gray-600 px-4 py-2 text-white
                hover:bg-gray-700
              "
              @click="counterStore.decrement"
            >
              Decrement
            </button>
            <button
              class="
                rounded bg-red-600 px-4 py-2 text-white
                hover:bg-red-700
              "
              @click="counterStore.reset"
            >
              Reset
            </button>
          </div>
          <div class="text-center text-sm text-gray-600">
            Double: {{ counterStore.doubleCount }}
          </div>
        </div>
      </div>
    </div>

    <!-- Feature Architecture Info -->
    <div class="mt-6 rounded-lg bg-blue-50 p-6">
      <h2 class="mb-4 text-xl font-semibold text-blue-900">
        Feature-Based Architecture
      </h2>
      <div class="space-y-2 text-blue-800">
        <p>✅ <strong>Auth Feature:</strong> Complete authentication system with services, stores, and types</p>
        <p>✅ <strong>Dashboard Feature:</strong> Counter functionality with its own store</p>
        <p>✅ <strong>Shared Services:</strong> API utilities with ofetch and interceptors</p>
        <p>✅ <strong>Core Configuration:</strong> Router and app-level setup</p>
        <p>✅ <strong>Type Safety:</strong> Comprehensive TypeScript types and Zod validation</p>
        <p>✅ <strong>Layout System:</strong> Header, footer, and dashboard layouts with responsive navigation</p>
        <p>✅ <strong>Dashboard Layout:</strong> Sidebar navigation with mobile support inspired by shadcn-vue</p>
      </div>
    </div>
  </div>
</template>

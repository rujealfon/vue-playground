<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useUserStore } from '@/entities/user'
import { LoginForm } from '@/features/auth-login'

const router = useRouter()
const userStore = useUserStore()

function handleLoginSuccess() {
  // Redirect to home page after successful login
  router.push('/')
}
</script>

<template>
  <div
    class="
      flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12
      sm:px-6
      lg:px-8
    "
  >
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">
          Welcome back
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Sign in to your account
        </p>
      </div>

      <div
        v-if="userStore.error" class="
          rounded-md border border-red-200 bg-red-50 p-4
        "
      >
        <div class="flex">
          <div class="text-sm text-red-700">
            {{ userStore.error }}
          </div>
        </div>
      </div>

      <LoginForm @success="handleLoginSuccess" />
    </div>
  </div>
</template>

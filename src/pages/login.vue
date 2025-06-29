<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/features/auth'
import { Button } from '@/shared/components/ui/button'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

async function handleLogin() {
  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    })

    // Get redirect path from query parameter or default to dashboard
    const redirectPath = (route.query.redirect as string) || '/dashboard'

    // Redirect to intended destination on success
    await router.push(redirectPath)
  }
  catch (error) {
    console.error('Login failed:', error)
    // Error handling is managed by the auth store
  }
}

// Demo login function for testing
async function handleDemoLogin() {
  email.value = 'demo@example.com'
  password.value = 'password123'
  await handleLogin()
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
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Demo authentication for Vue Playground
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div>
          <label for="email" class="sr-only">Email address</label>
          <input
            id="email"
            v-model="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="
              relative block w-full appearance-none rounded-md border
              border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500
              focus:z-10 focus:border-indigo-500 focus:ring-indigo-500
              focus:outline-none
              sm:text-sm
            "
            placeholder="Email address"
          >
        </div>

        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="
              relative block w-full appearance-none rounded-md border
              border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500
              focus:z-10 focus:border-indigo-500 focus:ring-indigo-500
              focus:outline-none
              sm:text-sm
            "
            placeholder="Password"
          >
        </div>

        <div class="flex flex-col space-y-4">
          <Button
            type="submit"
            :disabled="authStore.isLoading"
            class="w-full"
          >
            {{ authStore.isLoading ? 'Signing in...' : 'Sign in' }}
          </Button>

          <Button
            type="button"
            variant="outline"
            class="w-full"
            @click="handleDemoLogin"
          >
            Demo Login
          </Button>
        </div>

        <div v-if="authStore.error" class="text-center text-sm text-red-600">
          {{ authStore.error }}
        </div>
      </form>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import LoginForm from '@/features/auth/components/login-form.vue'

const route = useRoute()

// Get redirect path from query parameter or default to dashboard
const redirectPath = (route.query.redirect as string) || '/dashboard'

// Handle login success
function handleLoginSuccess(response: { success: boolean, message: string }) {
  // Login success is handled by the auth store
  return response
}

// Handle login error
function handleLoginError(error: string) {
  console.error('Login failed:', error)
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

      <div class="mt-8">
        <LoginForm
          :redirect-path="redirectPath"
          :show-demo-login="true"
          :show-test-toasts="true"
          @success="handleLoginSuccess"
          @error="handleLoginError"
        />
      </div>

      <!-- Demo Credentials Info -->
      <div class="mt-6 rounded-md bg-blue-50 p-4">
        <div class="text-sm text-blue-800">
          <strong>Demo Credentials:</strong>
          <div class="mt-2 space-y-1">
            <div><strong>Email:</strong> john@example.com</div>
            <div><strong>Password:</strong> password123</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

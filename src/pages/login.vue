<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import LoginForm from '@/features/auth/components/login-form.vue'
import RegisterForm from '@/features/auth/components/register-form.vue'
import { useAuth } from '@/features/auth/composables/use-auth'

// Router
const router = useRouter()

// Auth composable
const { isAuthenticated } = useAuth()

// Local state
const showRegister = ref(false)

// Event handlers
function handleLoginSuccess() {
  // Redirect to dashboard or home page after successful login
  router.push('/')
}

function handleRegisterSuccess() {
  // Redirect to dashboard or home page after successful registration
  router.push('/')
}

// Redirect if already authenticated
if (isAuthenticated) {
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
      <div v-if="!showRegister">
        <LoginForm
          @switch-to-register="showRegister = true"
          @login-success="handleLoginSuccess"
        />
      </div>

      <div v-else>
        <RegisterForm
          @switch-to-login="showRegister = false"
          @register-success="handleRegisterSuccess"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here if needed */
</style>

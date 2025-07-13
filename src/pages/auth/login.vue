<script setup lang="ts">
import LoginForm from '@/features/auth/components/login-form.vue'

defineOptions({
  name: 'LoginPage'
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-background">
    <div class="w-full max-w-md p-6">
      <LoginForm />
    </div>
  </div>
</template>

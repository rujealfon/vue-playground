<script setup lang="ts">
import RegisterForm from '@/features/auth/components/register-form.vue'

defineOptions({
  name: 'RegisterPage'
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-background">
    <div class="w-full max-w-md p-6">
      <RegisterForm />
    </div>
  </div>
</template>

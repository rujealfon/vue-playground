<route lang="yaml">
meta:
  layout: auth
</route>

<script setup lang="ts">
import { ref } from 'vue'

import { LoginForm, RegisterForm } from '@/features/auth'

const mode = ref<'login' | 'register'>('login')

function switchMode(newMode: 'login' | 'register') {
  mode.value = newMode
}

function handleSuccess() {
  // Redirect to dashboard or home
  // console.log('Authentication successful!')
}
</script>

<template>
  <div>
    <LoginForm
      v-if="mode === 'login'"
      @success="handleSuccess"
      @switch="switchMode"
    />

    <RegisterForm
      v-else
      @success="handleSuccess"
      @switch="switchMode"
    />
  </div>
</template>

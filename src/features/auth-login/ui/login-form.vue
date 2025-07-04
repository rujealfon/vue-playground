<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { Button, Card, Input } from '@/shared/ui'

import { useLoginForm } from '../model'

const emit = defineEmits<{
  success: []
}>()

const { form, errors, isSubmitting, submitLogin } = useLoginForm()

async function handleSubmit() {
  const success = await submitLogin()
  if (success) {
    emit('success')
  }
}
</script>

<template>
  <Card title="Sign In" class="w-full max-w-md">
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <Input
        id="email"
        v-model="form.email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        :error="errors.email"
        required
      />

      <Input
        id="password"
        v-model="form.password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        :error="errors.password"
        required
      />

      <Button
        type="submit"
        variant="default"
        class="w-full"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Signing in...' : 'Sign In' }}
      </Button>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          Don't have an account?
          <RouterLink
            to="/register" class="
              text-blue-600
              hover:underline
            "
          >
            Sign up
          </RouterLink>
        </p>
        <p class="mt-2 text-xs text-gray-500">
          Demo: demo@example.com / password123
        </p>
      </div>
    </form>
  </Card>
</template>

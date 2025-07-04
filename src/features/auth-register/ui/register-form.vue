<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { Button, Card, Input } from '@/shared/ui'

import { useRegisterForm } from '../model'

const emit = defineEmits<{
  success: []
}>()

const { form, errors, isSubmitting, submitRegister } = useRegisterForm()

async function handleSubmit() {
  const success = await submitRegister()
  if (success) {
    emit('success')
  }
}
</script>

<template>
  <Card title="Create Account" class="w-full max-w-md">
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <Input
        id="name"
        v-model="form.name"
        type="text"
        label="Full Name"
        placeholder="Enter your full name"
        :error="errors.name"
        required
      />

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

      <Input
        id="confirmPassword"
        v-model="form.confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
        :error="errors.confirmPassword"
        required
      />

      <Button
        type="submit"
        variant="default"
        class="w-full"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Creating account...' : 'Create Account' }}
      </Button>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          Already have an account?
          <RouterLink
            to="/login" class="
              text-blue-600
              hover:underline
            "
          >
            Sign in
          </RouterLink>
        </p>
      </div>
    </form>
  </Card>
</template>

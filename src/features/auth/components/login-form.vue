<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

import Button from '@/components/ui/button/Button.vue'

import { useAuth } from '../composables/use-auth'
import { loginSchema } from '../types/schemas'

const { login, isLoginLoading, error } = useAuth()

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: toTypedSchema(loginSchema)
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [rememberMe, rememberMeAttrs] = defineField('rememberMe')

const onSubmit = handleSubmit(async (values) => {
  try {
    await login(values)
  }
  catch (error) {
    console.error('Login failed:', error)
  }
})
</script>

<template>
  <div class="mx-auto w-full max-w-md space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold">
        Sign In
      </h1>
      <p class="mt-2 text-muted-foreground">
        Enter your credentials to access your account
      </p>
    </div>

    <form class="space-y-4" @submit="onSubmit">
      <div class="space-y-2">
        <label for="email" class="text-sm font-medium">
          Email
          <input
            id="email"
            v-model="email"
            v-bind="emailAttrs"
            type="email"
            placeholder="Enter your email"
            class="
              mt-1 w-full rounded-md border border-input px-3 py-2
              focus:ring-2 focus:ring-ring focus:outline-none
            "
            :class="{ 'border-destructive': errors.email }"
          >
        </label>
        <p v-if="errors.email" class="text-sm text-destructive">
          {{ errors.email }}
        </p>
      </div>

      <div class="space-y-2">
        <label for="password" class="text-sm font-medium">
          Password
          <input
            id="password"
            v-model="password"
            v-bind="passwordAttrs"
            type="password"
            placeholder="Enter your password"
            class="
              mt-1 w-full rounded-md border border-input px-3 py-2
              focus:ring-2 focus:ring-ring focus:outline-none
            "
            :class="{ 'border-destructive': errors.password }"
          >
        </label>
        <p v-if="errors.password" class="text-sm text-destructive">
          {{ errors.password }}
        </p>
      </div>

      <div class="flex items-center space-x-2">
        <label
          for="rememberMe"
          class="flex cursor-pointer items-center space-x-2 text-sm"
        >
          <input
            id="rememberMe"
            v-model="rememberMe"
            v-bind="rememberMeAttrs"
            type="checkbox"
            class="rounded border-input"
          >
          <span>Remember me</span>
        </label>
      </div>

      <Button
        type="submit"
        class="w-full"
        :disabled="isLoginLoading"
      >
        {{ isLoginLoading ? 'Signing in...' : 'Sign In' }}
      </Button>

      <p v-if="error" class="text-center text-sm text-destructive">
        {{ error }}
      </p>
    </form>

    <div class="text-center">
      <a
        href="/auth/register" class="
          text-sm text-primary
          hover:underline
        "
      >
        Don't have an account? Sign up
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

import Button from '@/components/ui/button/Button.vue'

import { useAuth } from '../composables/use-auth'
import { registerSchema } from '../types/schemas'

const { register, isRegisterLoading, error } = useAuth()

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: toTypedSchema(registerSchema)
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

const onSubmit = handleSubmit(async (values) => {
  try {
    await register(values)
  }
  catch (error) {
    console.error('Registration failed:', error)
  }
})
</script>

<template>
  <div class="mx-auto w-full max-w-md space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold">
        Create Account
      </h1>
      <p class="mt-2 text-muted-foreground">
        Sign up to get started with your account
      </p>
    </div>

    <form class="space-y-4" @submit="onSubmit">
      <div class="space-y-2">
        <label for="name" class="text-sm font-medium">
          Full Name
          <input
            id="name"
            v-model="name"
            v-bind="nameAttrs"
            type="text"
            placeholder="Enter your full name"
            class="
              mt-1 w-full rounded-md border border-input px-3 py-2
              focus:ring-2 focus:ring-ring focus:outline-none
            "
            :class="{ 'border-destructive': errors.name }"
          >
        </label>
        <p v-if="errors.name" class="text-sm text-destructive">
          {{ errors.name }}
        </p>
      </div>

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
            placeholder="Create a password"
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

      <div class="space-y-2">
        <label for="confirmPassword" class="text-sm font-medium">
          Confirm Password
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            v-bind="confirmPasswordAttrs"
            type="password"
            placeholder="Confirm your password"
            class="
              mt-1 w-full rounded-md border border-input px-3 py-2
              focus:ring-2 focus:ring-ring focus:outline-none
            "
            :class="{ 'border-destructive': errors.confirmPassword }"
          >
        </label>
        <p v-if="errors.confirmPassword" class="text-sm text-destructive">
          {{ errors.confirmPassword }}
        </p>
      </div>

      <Button
        type="submit"
        class="w-full"
        :disabled="isRegisterLoading"
      >
        {{ isRegisterLoading ? 'Creating account...' : 'Create Account' }}
      </Button>

      <p v-if="error" class="text-center text-sm text-destructive">
        {{ error }}
      </p>
    </form>

    <div class="text-center">
      <a
        href="/auth/login" class="
          text-sm text-primary
          hover:underline
        "
      >
        Already have an account? Sign in
      </a>
    </div>
  </div>
</template>

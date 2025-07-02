<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { ApiError, RegisterForm } from '../types'

import { useAuth } from '../composables/use-auth'
import { registerSchema } from '../types'

// Emits
const emit = defineEmits<{
  switchToLogin: []
  registerSuccess: []
}>()

// Composables
const { register, isLoading, registerError } = useAuth()

// Form setup with Zod validation
const { handleSubmit } = useForm<RegisterForm>({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
})

// Form submission
const onSubmit = handleSubmit(async (values) => {
  try {
    await register(values)
    // Emit success event
    emit('registerSuccess')
  }
  catch (error) {
    console.error('Registration failed:', error)
  }
})

// Helper function to get error message
function getErrorMessage(error: ApiError | null): string {
  if (!error)
    return ''

  if (error.errors) {
    // Handle validation errors
    const firstError = Object.values(error.errors)[0]
    return Array.isArray(firstError) ? firstError[0] : firstError
  }

  return error.message || 'An error occurred during registration'
}
</script>

<template>
  <Card class="mx-auto w-full max-w-md">
    <CardHeader class="space-y-1">
      <CardTitle class="text-center text-2xl font-bold">
        Create an account
      </CardTitle>
      <CardDescription class="text-center">
        Enter your information to create your account
      </CardDescription>
    </CardHeader>

    <CardContent>
      <form class="space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel for="name">
              Full Name
            </FormLabel>
            <FormControl>
              <Input
                id="name"
                v-bind="componentField"
                type="text"
                placeholder="Enter your full name"
                autocomplete="name"
                :disabled="isLoading"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel for="register-email">
              Email
            </FormLabel>
            <FormControl>
              <Input
                id="register-email"
                v-bind="componentField"
                type="email"
                placeholder="Enter your email"
                autocomplete="email"
                :disabled="isLoading"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel for="register-password">
              Password
            </FormLabel>
            <FormControl>
              <Input
                id="register-password"
                v-bind="componentField"
                type="password"
                placeholder="Create a password"
                autocomplete="new-password"
                :disabled="isLoading"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="confirmPassword">
          <FormItem>
            <FormLabel for="confirm-password">
              Confirm Password
            </FormLabel>
            <FormControl>
              <Input
                id="confirm-password"
                v-bind="componentField"
                type="password"
                placeholder="Confirm your password"
                autocomplete="new-password"
                :disabled="isLoading"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div
          v-if="registerError" class="
            rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600
          "
        >
          {{ getErrorMessage(registerError) }}
        </div>

        <Button
          type="submit"
          :disabled="isLoading"
          class="w-full"
        >
          <div v-if="isLoading" class="flex items-center space-x-2">
            <div
              class="
                h-4 w-4 animate-spin rounded-full border-2 border-white
                border-t-transparent
              "
            />
            <span>Creating account...</span>
          </div>
          <span v-else>Create account</span>
        </Button>
      </form>
    </CardContent>

    <CardFooter class="flex flex-col space-y-2">
      <div class="text-center text-sm text-gray-600">
        Already have an account?
        <button
          type="button"
          class="
            ml-1 font-medium text-blue-600
            hover:text-blue-800
          "
          @click="emit('switchToLogin')"
        >
          Sign in
        </button>
      </div>
    </CardFooter>
  </Card>
</template>

<style scoped>
/* Add any custom styles here if needed */
</style>

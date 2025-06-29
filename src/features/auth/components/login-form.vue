<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'

import { useAuthStore } from '@/features/auth/stores/auth.store'
import Button from '@/shared/components/ui/button/Button.vue'
import { useToast } from '@/shared/composables/use-toast'

export type LoginFormProps = {
  redirectPath?: string
  showDemoLogin?: boolean
  showTestToasts?: boolean
}

export type LoginFormEmits = {
  success: [response: { success: boolean, message: string }]
  error: [error: string]
}

const props = withDefaults(defineProps<LoginFormProps>(), {
  redirectPath: '/dashboard',
  showDemoLogin: true,
  showTestToasts: false,
})

const emit = defineEmits<LoginFormEmits>()

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

// Zod validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long'),
})

type LoginFormData = z.infer<typeof loginSchema>

// Form state
const email = ref('')
const password = ref('')
const validationErrors = ref<Partial<Record<keyof LoginFormData, string>>>({})
const hasAttemptedSubmit = ref(false)

// Computed validation state
const isFormValid = computed(() => {
  const result = loginSchema.safeParse({
    email: email.value,
    password: password.value,
  })
  return result.success
})

// Validate individual field
function validateField(field: keyof LoginFormData) {
  const fieldValue = field === 'email' ? email.value : password.value
  const fieldSchema = loginSchema.shape[field]

  const result = fieldSchema.safeParse(fieldValue)

  if (!result.success) {
    validationErrors.value[field] = result.error.errors[0]?.message || `Invalid ${field}`
  }
  else {
    delete validationErrors.value[field]
  }
}

// Validate entire form
function validateForm(): boolean {
  const result = loginSchema.safeParse({
    email: email.value,
    password: password.value,
  })

  if (!result.success) {
    validationErrors.value = {}
    result.error.errors.forEach((error) => {
      const field = error.path[0] as keyof LoginFormData
      validationErrors.value[field] = error.message
    })
    return false
  }

  validationErrors.value = {}
  return true
}

// Handle field blur for validation
function handleFieldBlur(field: keyof LoginFormData) {
  if (hasAttemptedSubmit.value) {
    validateField(field)
  }
}

// Handle field input for real-time validation after first submit attempt
function handleFieldInput(field: keyof LoginFormData) {
  if (hasAttemptedSubmit.value) {
    // Clear error on input if field has value
    const fieldValue = field === 'email' ? email.value : password.value
    if (fieldValue && validationErrors.value[field]) {
      validateField(field)
    }
  }
}

async function handleLogin() {
  hasAttemptedSubmit.value = true

  if (!validateForm()) {
    return
  }

  try {
    const response = await authStore.login({
      email: email.value,
      password: password.value,
    })

    emit('success', response)

    // Redirect to intended destination on success
    await router.push(props.redirectPath)
  }
  catch (error) {
    console.error('Login failed:', error)
    emit('error', error instanceof Error ? error.message : 'Login failed')
    // Error handling is managed by the auth store (shows toast)
  }
}

// Demo login function for testing
async function handleDemoLogin() {
  email.value = 'john@example.com'
  password.value = 'password123'

  // Clear any validation errors
  validationErrors.value = {}
  hasAttemptedSubmit.value = false

  await handleLogin()
}

// Test toast functions
function testToasts() {
  toast.success('Success!', 'This is a success message')
  toast.error('Error!', 'This is an error message')
  toast.warning('Warning!', 'This is a warning message')
  toast.info('Info!', 'This is an info message')
}

// Clear form
function clearForm() {
  email.value = ''
  password.value = ''
  validationErrors.value = {}
  hasAttemptedSubmit.value = false
}

// Expose methods for parent component
defineExpose({
  clearForm,
  handleDemoLogin,
})
</script>

<template>
  <form class="space-y-6" @submit.prevent="handleLogin">
    <div class="space-y-4">
      <!-- Email Field -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          autocomplete="email"
          required
          class="
            relative block w-full appearance-none rounded-md border px-3 py-2
            text-gray-900 placeholder-gray-500
            focus:z-10 focus:outline-none
            sm:text-sm
          "
          :class="
            validationErrors.email
              ? `
                border-red-300
                focus:border-red-500 focus:ring-red-500
              `
              : `
                border-gray-300
                focus:border-indigo-500 focus:ring-indigo-500
              `
          "
          placeholder="Enter your email address"
          @blur="handleFieldBlur('email')"
          @input="handleFieldInput('email')"
        >
        <div v-if="validationErrors.email" class="mt-1 text-sm text-red-600">
          {{ validationErrors.email }}
        </div>
      </div>

      <!-- Password Field -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
          class="
            relative block w-full appearance-none rounded-md border px-3 py-2
            text-gray-900 placeholder-gray-500
            focus:z-10 focus:outline-none
            sm:text-sm
          "
          :class="
            validationErrors.password
              ? `
                border-red-300
                focus:border-red-500 focus:ring-red-500
              `
              : `
                border-gray-300
                focus:border-indigo-500 focus:ring-indigo-500
              `
          "
          placeholder="Enter your password"
          @blur="handleFieldBlur('password')"
          @input="handleFieldInput('password')"
        >
        <div v-if="validationErrors.password" class="mt-1 text-sm text-red-600">
          {{ validationErrors.password }}
        </div>
      </div>
    </div>

    <div class="flex flex-col space-y-4">
      <Button
        type="submit"
        :disabled="authStore.isLoading || (hasAttemptedSubmit && !isFormValid)"
        class="w-full"
      >
        {{ authStore.isLoading ? 'Signing in...' : 'Sign in' }}
      </Button>

      <Button
        v-if="showDemoLogin"
        type="button"
        variant="outline"
        class="w-full"
        :disabled="authStore.isLoading"
        @click="handleDemoLogin"
      >
        Demo Login
      </Button>

      <Button
        v-if="showTestToasts"
        type="button"
        variant="secondary"
        class="w-full text-xs"
        @click="testToasts"
      >
        Test Toasts
      </Button>
    </div>

    <!-- Validation Summary -->
    <div
      v-if="hasAttemptedSubmit && Object.keys(validationErrors).length > 0"
      class="rounded-md bg-red-50 p-4"
    >
      <div class="text-sm text-red-800">
        <strong>Please correct the following errors:</strong>
        <ul class="mt-2 list-inside list-disc space-y-1">
          <li v-for="(error, field) in validationErrors" :key="field">
            {{ error }}
          </li>
        </ul>
      </div>
    </div>
  </form>
</template>

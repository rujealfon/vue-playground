<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'

import { Button } from '@/shared/ui'

import { loginSchema } from '../lib'
import { useAuthStore } from '../model'

const emit = defineEmits<{
  success: []
  switch: [mode: 'register']
}>()

const authStore = useAuthStore()

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(loginSchema)
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const showPassword = ref(false)

const onSubmit = handleSubmit(async (values) => {
  await authStore.login(values)
  if (authStore.isAuthenticated) {
    emit('success')
  }
})
</script>

<template>
  <div class="mx-auto w-full max-w-md">
    <div class="rounded-lg bg-white p-8 shadow-md">
      <h2 class="mb-6 text-center text-2xl font-bold text-gray-900">
        Sign In
      </h2>

      <form class="space-y-4" @submit="onSubmit">
        <div>
          <label
            for="login-email"
            class="block text-sm font-medium text-gray-700"
          >
            Email Address
            <input
              id="login-email"
              v-model="email"
              v-bind="emailAttrs"
              type="email"
              autocomplete="email"
              class="
                mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                focus:border-transparent focus:ring-2 focus:ring-blue-500
                focus:outline-none
              "
              :class="{ 'border-red-500': errors.email }"
            >
          </label>
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">
            {{ errors.email }}
          </p>
        </div>

        <div>
          <label
            for="login-password"
            class="block text-sm font-medium text-gray-700"
          >
            Password
            <div class="relative mt-1">
              <input
                id="login-password"
                v-model="password"
                v-bind="passwordAttrs"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                class="
                  w-full rounded-md border border-gray-300 px-3 py-2 pr-10
                  focus:border-transparent focus:ring-2 focus:ring-blue-500
                  focus:outline-none
                "
                :class="{ 'border-red-500': errors.password }"
              >
              <button
                type="button"
                class="
                  absolute inset-y-0 right-0 flex items-center pr-3
                  text-gray-500
                  hover:text-gray-700
                "
                @click="showPassword = !showPassword"
              >
                <span class="text-sm">{{
                  showPassword ? 'Hide' : 'Show'
                }}</span>
              </button>
            </div>
          </label>
          <p v-if="errors.password" class="mt-1 text-sm text-red-600">
            {{ errors.password }}
          </p>
        </div>

        <div v-if="authStore.error" class="text-sm text-red-600">
          {{ authStore.error }}
        </div>

        <Button
          type="submit"
          :disabled="authStore.isLoading"
          class="w-full"
        >
          {{ authStore.isLoading ? 'Signing in...' : 'Sign In' }}
        </Button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Don't have an account?
          <button
            class="
              font-medium text-blue-600
              hover:text-blue-800
            "
            @click="emit('switch', 'register')"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Heading, Paragraph } from '@atoms/text'
import { Card, CardContent, CardFooter, CardHeader } from '@atoms/ui'
import { RegisterForm } from '@molecules/forms'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import type { RegisterFormData } from '@/schemas'

import { useAuthStore } from '@/stores'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref<string | null>(null)

async function handleRegister(formData: RegisterFormData) {
  try {
    loading.value = true
    error.value = null

    const result = await authStore.register(formData)

    if (result.success) {
      router.push('/')
    }
    else {
      error.value = result.error || 'Registration failed. Please try again.'
    }
  }
  catch {
    error.value = 'An unexpected error occurred. Please try again.'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <Card class="mx-auto w-full max-w-md">
    <CardHeader class="space-y-2 text-center">
      <Heading :level="2">
        Create your account
      </Heading>
      <Paragraph variant="muted">
        Enter your information to get started
      </Paragraph>
    </CardHeader>

    <CardContent>
      <div
        v-if="error" class="
          mb-4 rounded-md border border-destructive/20 bg-destructive/10 p-3
          text-sm text-destructive
        "
      >
        {{ error }}
      </div>

      <RegisterForm
        :loading="loading"
        @submit="handleRegister"
      />
    </CardContent>

    <CardFooter class="flex flex-col space-y-4">
      <div class="text-center text-sm text-muted-foreground">
        Already have an account?
        <RouterLink
          to="/login"
          class="
            font-medium text-primary
            hover:underline
          "
        >
          Sign in
        </RouterLink>
      </div>
    </CardFooter>
  </Card>
</template>

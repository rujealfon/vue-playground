<script setup lang="ts">
import { Heading, Paragraph } from '@atoms/text'
import { Card, CardContent, CardFooter, CardHeader } from '@atoms/ui'
import { LoginForm } from '@molecules/forms'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import type { LoginFormData } from '@/schemas'

import { useAuthStore } from '@/stores'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref<string | null>(null)

async function handleLogin(formData: LoginFormData) {
  try {
    loading.value = true
    error.value = null

    const result = await authStore.login(formData)

    if (result.success) {
      router.push('/')
    }
    else {
      error.value = result.error || 'Login failed. Please try again.'
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
        Welcome back
      </Heading>
      <Paragraph variant="muted">
        Enter your email and password to sign in
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

      <LoginForm
        :loading="loading"
        @submit="handleLogin"
      />
    </CardContent>

    <CardFooter class="flex flex-col space-y-4">
      <div class="text-center text-sm text-muted-foreground">
        Don't have an account?
        <RouterLink
          to="/register"
          class="
            font-medium text-primary
            hover:underline
          "
        >
          Sign up
        </RouterLink>
      </div>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import TheWelcome from '@/components/the-welcome.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/features/auth/composables/use-auth'

const router = useRouter()
const { user, isAuthenticated, logout } = useAuth()

async function handleLogout() {
  await logout()
  router.push('/login')
}

function goToLogin() {
  router.push('/login')
}
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <!-- Authentication Status Card -->
    <Card class="mx-auto mb-8 max-w-md">
      <CardHeader>
        <CardTitle>Authentication Status</CardTitle>
        <CardDescription>
          Current authentication state and user information
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div v-if="isAuthenticated" class="space-y-2">
          <p class="text-sm font-medium text-green-600">
            ✅ Authenticated
          </p>
          <div class="text-sm text-gray-600">
            <p><strong>Name:</strong> {{ user?.name }}</p>
            <p><strong>Email:</strong> {{ user?.email }}</p>
            <p><strong>Role:</strong> {{ user?.role }}</p>
          </div>
          <Button variant="outline" class="w-full" @click="handleLogout">
            Logout
          </Button>
        </div>
        <div v-else class="space-y-2">
          <p class="text-sm font-medium text-red-600">
            ❌ Not Authenticated
          </p>
          <Button class="w-full" @click="goToLogin">
            Go to Login
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Original Welcome Content -->
    <TheWelcome />
  </main>
</template>

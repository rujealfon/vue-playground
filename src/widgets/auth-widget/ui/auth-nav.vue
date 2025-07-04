<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useUserStore } from '@/entities/user'
import { Button } from '@/shared/ui'

const router = useRouter()
const userStore = useUserStore()

async function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex items-center space-x-4">
    <div v-if="userStore.isAuthenticated" class="flex items-center space-x-4">
      <span class="text-sm text-gray-700">
        Welcome, {{ userStore.user?.name }}!
      </span>
      <Button variant="outline" size="sm" @click="handleLogout">
        Logout
      </Button>
    </div>

    <div v-else class="flex items-center space-x-2">
      <RouterLink to="/login">
        <Button variant="outline" size="sm">
          Login
        </Button>
      </RouterLink>
      <RouterLink to="/register">
        <Button variant="default" size="sm">
          Sign Up
        </Button>
      </RouterLink>
    </div>
  </div>
</template>

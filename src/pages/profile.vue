<script setup lang="ts">
import { useAuth } from '@/features/auth/composables/use-auth'

defineOptions({
  name: 'ProfilePage'
})

const { user } = useAuth()
</script>

<template>
  <div class="container mx-auto space-y-6 p-6">
    <div>
      <h1 class="text-3xl font-bold">
        Profile
      </h1>
      <p class="text-muted-foreground">
        Manage your account settings
      </p>
    </div>

    <div class="rounded-lg border bg-card p-6">
      <h2 class="mb-4 text-xl font-semibold">
        User Information
      </h2>

      <div class="space-y-4">
        <div>
          <p class="text-sm font-medium text-gray-700">
            Name
          </p>
          <p class="text-lg">
            {{ user?.name || 'Not available' }}
          </p>
        </div>

        <div>
          <p class="text-sm font-medium text-gray-700">
            Email
          </p>
          <p class="text-lg">
            {{ user?.email || 'Not available' }}
          </p>
        </div>

        <div>
          <p class="text-sm font-medium text-gray-700">
            Role
          </p>
          <p class="text-lg capitalize">
            {{ user?.role || 'Not available' }}
          </p>
        </div>

        <div>
          <p class="text-sm font-medium text-gray-700">
            Member Since
          </p>
          <p class="text-lg">
            {{ user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Not available' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

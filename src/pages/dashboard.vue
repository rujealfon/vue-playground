<route lang="yaml">
meta:
  layout: dashboard
</route>

<script setup lang="ts">
import type { User } from '@/shared/types'

import { UserCard } from '@/entities/user'
import { CounterDisplay } from '@/features/counter'
import { ProfileForm } from '@/features/user-profile'

// Mock user data for demonstration
const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', avatar: undefined },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: undefined },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', avatar: undefined }
]

function handleUserClick(_user: User) {
  // console.log('User clicked:', user)
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="mb-6 text-3xl font-bold text-gray-900">
        Dashboard
      </h1>
      <p class="text-gray-600">
        Welcome to your dashboard. This page demonstrates the dashboard layout.
      </p>
    </div>

    <!-- Counter Widget -->
    <div class="rounded-lg bg-white p-6 shadow">
      <h2 class="mb-4 text-xl font-semibold">
        Interactive Counter
      </h2>
      <CounterDisplay />
    </div>

    <!-- Users List -->
    <div class="rounded-lg bg-white p-6 shadow">
      <h2 class="mb-4 text-xl font-semibold">
        Users
      </h2>
      <div class="space-y-3">
        <UserCard
          v-for="user in mockUsers"
          :key="user.id"
          :user="user"
          :clickable="true"
          @click="handleUserClick"
        />
      </div>
    </div>

    <!-- Profile Form -->
    <div class="rounded-lg bg-white p-6 shadow">
      <h2 class="mb-4 text-xl font-semibold">
        Profile Settings
      </h2>
      <ProfileForm />
    </div>
  </div>
</template>

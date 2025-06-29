<route lang="yaml">
meta:
  layout: dashboard
</route>

<script setup lang="ts">
// Dashboard Users Management page
// This would typically include user CRUD operations, role management, etc.
import { Button } from '@/shared/components/ui/button'

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'moderator', status: 'inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'user', status: 'active' },
]
</script>

<template>
  <div class="p-6">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">
          Users
        </h1>
        <p class="text-gray-600">
          Manage your application users
        </p>
      </div>

      <Button>
        Add User
      </Button>
    </div>

    <!-- Users Table -->
    <div class="overflow-hidden rounded-lg bg-white shadow-sm">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="
                px-6 py-3 text-left text-xs font-medium tracking-wider
                text-gray-500 uppercase
              "
            >
              User
            </th>
            <th
              class="
                px-6 py-3 text-left text-xs font-medium tracking-wider
                text-gray-500 uppercase
              "
            >
              Role
            </th>
            <th
              class="
                px-6 py-3 text-left text-xs font-medium tracking-wider
                text-gray-500 uppercase
              "
            >
              Status
            </th>
            <th
              class="
                px-6 py-3 text-left text-xs font-medium tracking-wider
                text-gray-500 uppercase
              "
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div
                  class="
                    flex h-10 w-10 items-center justify-center rounded-full
                    bg-gradient-to-r from-blue-500 to-purple-600
                  "
                >
                  <span class="text-sm font-medium text-white">
                    {{ user.name.charAt(0) }}
                  </span>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ user.name }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ user.email }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="inline-flex rounded-full px-2 py-1 text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-800': user.role === 'admin',
                  'bg-blue-100 text-blue-800': user.role === 'user',
                  'bg-purple-100 text-purple-800': user.role === 'moderator',
                }"
              >
                {{ user.role }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="inline-flex rounded-full px-2 py-1 text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-800': user.status === 'active',
                  'bg-red-100 text-red-800': user.status === 'inactive',
                }"
              >
                {{ user.status }}
              </span>
            </td>
            <td
              class="space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap"
            >
              <Button variant="ghost" size="sm">
                Edit
              </Button>
              <Button
                variant="ghost" size="sm" class="
                  text-red-600
                  hover:text-red-700
                "
              >
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

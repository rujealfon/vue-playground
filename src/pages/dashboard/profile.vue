<route lang="yaml">
meta:
  layout: dashboard
</route>

<script setup lang="ts">
import { useAuthStore } from '@/features/auth/stores/auth.store'
import Button from '@/shared/components/ui/button/Button.vue'

const authStore = useAuthStore()
</script>

<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">
        Profile
      </h1>
      <p class="text-gray-600">
        Manage your account information
      </p>
    </div>

    <div class="max-w-2xl">
      <!-- Profile Header -->
      <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
        <div class="flex items-center space-x-6">
          <div
            class="
              flex h-20 w-20 items-center justify-center rounded-full
              bg-gradient-to-r from-blue-500 to-purple-600
            "
          >
            <span class="text-2xl font-bold text-white">
              {{ authStore.user?.name.charAt(0).toUpperCase() }}
            </span>
          </div>
          <div class="flex-1">
            <h2 class="text-xl font-semibold text-gray-900">
              {{ authStore.user?.name }}
            </h2>
            <p class="text-gray-600">
              {{ authStore.user?.email }}
            </p>
            <div class="mt-2">
              <span
                class="
                  inline-flex items-center rounded-full px-3 py-1 text-sm
                  font-medium
                "
                :class="{
                  'bg-green-100 text-green-800': authStore.user?.role === 'admin',
                  'bg-blue-100 text-blue-800': authStore.user?.role === 'user',
                  'bg-purple-100 text-purple-800': authStore.user?.role === 'moderator',
                }"
              >
                {{ authStore.user?.role }}
              </span>
            </div>
          </div>
          <Button variant="outline">
            Edit Profile
          </Button>
        </div>
      </div>

      <!-- Profile Form -->
      <div class="rounded-lg bg-white p-6 shadow-sm">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">
          Personal Information
        </h3>

        <div class="space-y-4">
          <div
            class="
              grid grid-cols-1 gap-4
              md:grid-cols-2
            "
          >
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                :value="authStore.user?.name"
                class="
                  w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                  focus:outline-none
                "
              >
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                :value="authStore.user?.email"
                class="
                  w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                  focus:outline-none
                "
              >
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              :value="authStore.user?.role"
              disabled
              class="
                w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2
                text-gray-500 shadow-sm
              "
            >
            <p class="mt-1 text-sm text-gray-500">
              Role cannot be changed
            </p>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              rows="4"
              placeholder="Tell us about yourself..."
              class="
                w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                focus:outline-none
              "
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              placeholder="City, Country"
              class="
                w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                focus:outline-none
              "
            >
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="url"
              placeholder="https://yourwebsite.com"
              class="
                w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                focus:outline-none
              "
            >
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <Button variant="outline">
            Cancel
          </Button>
          <Button>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

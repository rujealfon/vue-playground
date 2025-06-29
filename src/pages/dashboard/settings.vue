<route lang="yaml">
meta:
  layout: dashboard
</route>

<script setup lang="ts">
import { Button } from '@/shared/components/ui/button'
</script>

<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">
        Settings
      </h1>
      <p class="text-gray-600">
        Manage your application preferences
      </p>
    </div>

    <!-- Settings Sections -->
    <div class="space-y-6">
      <!-- General Settings -->
      <div class="rounded-lg bg-white p-6 shadow-sm">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">
          General Settings
        </h3>

        <div class="space-y-4">
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">
              Application Name
            </label>
            <input
              type="text"
              value="Vue Playground"
              class="
                w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                focus:outline-none
              "
            >
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows="3"
              class="
                w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                focus:outline-none
              "
            >A modern Vue.js application with feature-based architecture</textarea>
          </div>
        </div>
      </div>

      <!-- Notification Settings -->
      <div class="rounded-lg bg-white p-6 shadow-sm">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">
          Notifications
        </h3>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm font-medium text-gray-900">
                Email Notifications
              </h4>
              <p class="text-sm text-gray-500">
                Receive notifications via email
              </p>
            </div>
            <label class="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" class="peer sr-only" checked>
              <div
                class="
                  peer h-6 w-11 rounded-full bg-gray-200
                  peer-checked:bg-blue-600 peer-checked:after:translate-x-full
                  peer-checked:after:border-white
                  peer-focus:ring-4 peer-focus:ring-blue-300
                  peer-focus:outline-none
                  after:absolute after:top-[2px] after:left-[2px] after:h-5
                  after:w-5 after:rounded-full after:border
                  after:border-gray-300 after:bg-white after:transition-all
                  after:content-['']
                "
              />
            </label>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm font-medium text-gray-900">
                Push Notifications
              </h4>
              <p class="text-sm text-gray-500">
                Receive push notifications in browser
              </p>
            </div>
            <label class="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" class="peer sr-only">
              <div
                class="
                  peer h-6 w-11 rounded-full bg-gray-200
                  peer-checked:bg-blue-600 peer-checked:after:translate-x-full
                  peer-checked:after:border-white
                  peer-focus:ring-4 peer-focus:ring-blue-300
                  peer-focus:outline-none
                  after:absolute after:top-[2px] after:left-[2px] after:h-5
                  after:w-5 after:rounded-full after:border
                  after:border-gray-300 after:bg-white after:transition-all
                  after:content-['']
                "
              />
            </label>
          </div>
        </div>
      </div>

      <!-- Security Settings -->
      <div class="rounded-lg bg-white p-6 shadow-sm">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">
          Security
        </h3>

        <div class="space-y-4">
          <div>
            <h4 class="mb-2 text-sm font-medium text-gray-900">
              Change Password
            </h4>
            <div class="space-y-3">
              <input
                type="password"
                placeholder="Current password"
                class="
                  w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                  focus:outline-none
                "
              >
              <input
                type="password"
                placeholder="New password"
                class="
                  w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                  focus:outline-none
                "
              >
              <input
                type="password"
                placeholder="Confirm new password"
                class="
                  w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                  focus:outline-none
                "
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end">
        <Button>
          Save Changes
        </Button>
      </div>
    </div>
  </div>
</template>

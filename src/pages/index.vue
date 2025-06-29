<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { useAuthStore } from '@/features/auth/stores/auth.store'
import Button from '@/shared/components/ui/button/Button.vue'

const authStore = useAuthStore()
</script>

<template>
  <div class="container mx-auto px-4 py-16">
    <div class="text-center">
      <!-- Hero Section -->
      <div class="mx-auto mb-16 max-w-4xl">
        <h1 class="mb-6 text-5xl font-bold text-gray-900">
          Welcome to Vue Playground
        </h1>
        <p class="mb-8 text-xl text-gray-600">
          A modern Vue.js application built with feature-based architecture.
          Explore the power of organized, scalable, and maintainable code.
        </p>

        <div
          class="
            flex flex-col justify-center gap-4
            sm:flex-row
          "
        >
          <RouterLink to="/dashboard">
            <Button
              size="lg" class="
                w-full
                sm:w-auto
              "
            >
              View Dashboard
            </Button>
          </RouterLink>

          <RouterLink to="/about">
            <Button
              variant="outline" size="lg" class="
                w-full
                sm:w-auto
              "
            >
              Learn More
            </Button>
          </RouterLink>
        </div>
      </div>

      <!-- Features Grid -->
      <div
        class="
          mb-16 grid grid-cols-1 gap-8
          md:grid-cols-3
        "
      >
        <div class="rounded-lg bg-white p-8 shadow-md">
          <div class="mb-4 text-3xl">
            🏗️
          </div>
          <h3 class="mb-3 text-xl font-semibold text-gray-900">
            Feature-Based Architecture
          </h3>
          <p class="text-gray-600">
            Organized by business domains, not technical layers.
            Perfect for teams and scalability.
          </p>
        </div>

        <div class="rounded-lg bg-white p-8 shadow-md">
          <div class="mb-4 text-3xl">
            🚀
          </div>
          <h3 class="mb-3 text-xl font-semibold text-gray-900">
            Modern Stack
          </h3>
          <p class="text-gray-600">
            Vue 3, TypeScript, Pinia, Tailwind CSS,
            and more cutting-edge technologies.
          </p>
        </div>

        <div class="rounded-lg bg-white p-8 shadow-md">
          <div class="mb-4 text-3xl">
            🔒
          </div>
          <h3 class="mb-3 text-xl font-semibold text-gray-900">
            Authentication Ready
          </h3>
          <p class="text-gray-600">
            Complete auth system with JWT tokens,
            role-based access, and secure API calls.
          </p>
        </div>
      </div>

      <!-- Status Section -->
      <div class="rounded-lg bg-blue-50 p-8">
        <h2 class="mb-4 text-2xl font-semibold text-blue-900">
          Current Status
        </h2>

        <div v-if="authStore.isAuthenticated" class="space-y-4">
          <div class="flex items-center justify-center space-x-2">
            <span class="h-3 w-3 rounded-full bg-green-500" />
            <span class="font-medium text-green-700">You are logged in</span>
          </div>

          <div v-if="authStore.user" class="text-blue-800">
            <p>Welcome back, <strong>{{ authStore.user.name }}</strong>!</p>
            <p>Role: <span class="font-medium">{{ authStore.user.role }}</span></p>
          </div>

          <RouterLink to="/dashboard">
            <Button variant="default">
              Go to Dashboard
            </Button>
          </RouterLink>
        </div>

        <div v-else class="space-y-4">
          <div class="flex items-center justify-center space-x-2">
            <span class="h-3 w-3 rounded-full bg-yellow-500" />
            <span class="font-medium text-yellow-700">Not logged in</span>
          </div>

          <p class="text-blue-800">
            Sign in to access the full dashboard and features.
          </p>

          <div class="space-x-4">
            <RouterLink to="/login">
              <Button variant="default">
                Sign In
              </Button>
            </RouterLink>

            <RouterLink to="/register">
              <Button variant="outline">
                Sign Up
              </Button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

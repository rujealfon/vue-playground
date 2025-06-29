<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import { Button } from '@/shared/components/ui/button'
</script>

<template>
  <div class="container mx-auto px-4 py-16">
    <div class="mx-auto max-w-4xl">
      <h1 class="mb-8 text-center text-4xl font-bold text-gray-900">
        About Vue Playground
      </h1>

      <div class="prose prose-lg mx-auto mb-12">
        <p class="text-xl leading-relaxed text-gray-600">
          Vue Playground is a modern, production-ready Vue.js application
          showcasing best practices in feature-based architecture. Built for
          developers who want to create scalable, maintainable applications.
        </p>
      </div>

      <!-- Feature Grid -->
      <div
        class="
          mb-12 grid grid-cols-1 gap-8
          md:grid-cols-2
        "
      >
        <div class="rounded-lg border bg-white p-6 shadow-sm">
          <h3 class="mb-3 text-xl font-semibold text-gray-900">
            🏗️ Feature-Based Architecture
          </h3>
          <p class="text-gray-600">
            Organized by business domains rather than technical layers.
            Each feature contains its own services, stores, types, and components.
          </p>
        </div>

        <div class="rounded-lg border bg-white p-6 shadow-sm">
          <h3 class="mb-3 text-xl font-semibold text-gray-900">
            🚀 Modern Tech Stack
          </h3>
          <p class="text-gray-600">
            Vue 3 Composition API, TypeScript, Pinia state management,
            Tailwind CSS, and Vite for lightning-fast development.
          </p>
        </div>

        <div class="rounded-lg border bg-white p-6 shadow-sm">
          <h3 class="mb-3 text-xl font-semibold text-gray-900">
            🔒 Authentication System
          </h3>
          <p class="text-gray-600">
            Complete JWT-based authentication with role-based access control,
            secure API calls, and user management.
          </p>
        </div>

        <div class="rounded-lg border bg-white p-6 shadow-sm">
          <h3 class="mb-3 text-xl font-semibold text-gray-900">
            📊 API Integration
          </h3>
          <p class="text-gray-600">
            Robust API layer with ofetch, request/response interceptors,
            Zod validation, and comprehensive error handling.
          </p>
        </div>
      </div>

      <!-- Technology Stack -->
      <div class="mb-12 rounded-lg bg-gray-50 p-8">
        <h2 class="mb-6 text-2xl font-semibold text-gray-900">
          Technology Stack
        </h2>
        <div
          class="
            grid grid-cols-2 gap-4
            md:grid-cols-4
          "
        >
          <div class="text-center">
            <div class="mb-2 text-2xl">
              ⚡
            </div>
            <div class="font-medium">
              Vue 3
            </div>
          </div>
          <div class="text-center">
            <div class="mb-2 text-2xl">
              📘
            </div>
            <div class="font-medium">
              TypeScript
            </div>
          </div>
          <div class="text-center">
            <div class="mb-2 text-2xl">
              🍍
            </div>
            <div class="font-medium">
              Pinia
            </div>
          </div>
          <div class="text-center">
            <div class="mb-2 text-2xl">
              🎨
            </div>
            <div class="font-medium">
              Tailwind
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center">
        <h2 class="mb-4 text-2xl font-semibold text-gray-900">
          Ready to Explore?
        </h2>
        <p class="mb-6 text-gray-600">
          Check out the dashboard to see all features in action.
        </p>
        <router-link to="/dashboard">
          <Button size="lg">
            View Dashboard
          </Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

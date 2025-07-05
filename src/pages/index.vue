<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import { CounterDisplay } from '@/features/counter'
import { Button } from '@/shared/ui'
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Hero Section -->
    <section class="container mx-auto px-4 py-16">
      <div class="text-center">
        <h1
          class="
            mb-6 text-5xl font-bold text-gray-900
            lg:text-6xl
          "
        >
          Vue Playground
        </h1>
        <p class="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
          A modern Vue.js application showcasing <strong>Feature-Sliced Design</strong> architecture with TypeScript, Tailwind CSS, and best practices for scalable development.
        </p>
        <div
          class="
            flex flex-col justify-center gap-4
            sm:flex-row
          "
        >
          <Button size="lg" class="px-8 py-3">
            <router-link to="/auth/login">
              Get Started
            </router-link>
          </Button>
          <Button variant="outline" size="lg" class="px-8 py-3">
            <router-link to="/about">
              Learn More
            </router-link>
          </Button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="container mx-auto px-4 py-16">
      <div class="mb-12 text-center">
        <h2 class="mb-4 text-3xl font-bold text-gray-900">
          Architecture Highlights
        </h2>
        <p class="mx-auto max-w-2xl text-lg text-gray-600">
          Built with modern tools and patterns for maintainable, scalable applications
        </p>
      </div>

      <div
        class="
          mb-16 grid gap-8
          md:grid-cols-2
          lg:grid-cols-3
        "
      >
        <!-- Feature 1 -->
        <div
          class="
            rounded-lg bg-white p-6 shadow-md transition-shadow
            hover:shadow-lg
          "
        >
          <div
            class="
              mb-4 flex h-12 w-12 items-center justify-center rounded-lg
              bg-blue-100
            "
          >
            <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-semibold text-gray-900">
            Feature-Sliced Design
          </h3>
          <p class="text-gray-600">
            Organized using FSD methodology for better scalability and team collaboration with clear layer boundaries.
          </p>
        </div>

        <!-- Feature 2 -->
        <div
          class="
            rounded-lg bg-white p-6 shadow-md transition-shadow
            hover:shadow-lg
          "
        >
          <div
            class="
              mb-4 flex h-12 w-12 items-center justify-center rounded-lg
              bg-green-100
            "
          >
            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-semibold text-gray-900">
            TypeScript First
          </h3>
          <p class="text-gray-600">
            Full TypeScript integration with strict typing, proper interfaces, and excellent developer experience.
          </p>
        </div>

        <!-- Feature 3 -->
        <div
          class="
            rounded-lg bg-white p-6 shadow-md transition-shadow
            hover:shadow-lg
          "
        >
          <div
            class="
              mb-4 flex h-12 w-12 items-center justify-center rounded-lg
              bg-purple-100
            "
          >
            <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-semibold text-gray-900">
            Modern Tooling
          </h3>
          <p class="text-gray-600">
            Powered by Vite, Bun, Tailwind CSS v4, and Vue 3 Composition API for lightning-fast development.
          </p>
        </div>

        <!-- Feature 4 -->
        <div
          class="
            rounded-lg bg-white p-6 shadow-md transition-shadow
            hover:shadow-lg
          "
        >
          <div
            class="
              mb-4 flex h-12 w-12 items-center justify-center rounded-lg
              bg-yellow-100
            "
          >
            <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-semibold text-gray-900">
            Component Library
          </h3>
          <p class="text-gray-600">
            Beautiful UI components built with Reka UI (Shadcn/ui for Vue) with consistent design system.
          </p>
        </div>

        <!-- Feature 5 -->
        <div
          class="
            rounded-lg bg-white p-6 shadow-md transition-shadow
            hover:shadow-lg
          "
        >
          <div
            class="
              mb-4 flex h-12 w-12 items-center justify-center rounded-lg
              bg-red-100
            "
          >
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-semibold text-gray-900">
            State Management
          </h3>
          <p class="text-gray-600">
            Organized Pinia stores following FSD patterns with feature-specific state management.
          </p>
        </div>

        <!-- Feature 6 -->
        <div
          class="
            rounded-lg bg-white p-6 shadow-md transition-shadow
            hover:shadow-lg
          "
        >
          <div
            class="
              mb-4 flex h-12 w-12 items-center justify-center rounded-lg
              bg-indigo-100
            "
          >
            <svg class="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-semibold text-gray-900">
            Testing Ready
          </h3>
          <p class="text-gray-600">
            Configured with Vitest for unit tests and Cypress for E2E testing with proper test patterns.
          </p>
        </div>
      </div>

      <!-- Interactive Demo -->
      <div class="rounded-lg bg-white p-8 shadow-lg">
        <div class="mb-8 text-center">
          <h3 class="mb-4 text-2xl font-bold text-gray-900">
            Interactive Demo
          </h3>
          <p class="text-gray-600">
            Try out the counter feature to see the FSD architecture in action
          </p>
        </div>
        <CounterDisplay />
      </div>
    </section>

    <!-- Call to Action -->
    <section class="container mx-auto px-4 py-16">
      <div
        class="
          rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8
          text-center text-white shadow-xl
          lg:p-12
        "
      >
        <h2 class="mb-4 text-3xl font-bold">
          Ready to Explore?
        </h2>
        <p class="mb-8 text-xl opacity-90">
          Check out the dashboard to see more features and the authentication system in action.
        </p>
        <div
          class="
            flex flex-col justify-center gap-4
            sm:flex-row
          "
        >
          <Button size="lg" variant="secondary" class="px-8 py-3">
            <router-link to="/dashboard">
              View Dashboard
            </router-link>
          </Button>
          <Button
            size="lg" variant="outline" class="
              border-white px-8 py-3 text-white
              hover:bg-white hover:text-blue-600
            "
          >
            <router-link to="/auth/login">
              Try Login
            </router-link>
          </Button>
        </div>
      </div>
    </section>
  </main>
</template>

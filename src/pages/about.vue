<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import { Button } from '@/shared/ui'
</script>

<template>
  <main class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white"
    >
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-4xl text-center">
          <h1
            class="
              mb-6 text-4xl font-bold
              lg:text-5xl
            "
          >
            About Vue Playground
          </h1>
          <p
            class="
              mb-8 text-xl opacity-90
              lg:text-2xl
            "
          >
            A comprehensive demonstration of modern Vue.js development using Feature-Sliced Design architecture
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="container mx-auto px-4 py-16">
      <div class="mx-auto max-w-4xl">
        <!-- Project Overview -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-lg">
          <h2 class="mb-6 text-3xl font-bold text-gray-900">
            Project Overview
          </h2>
          <div class="prose prose-lg text-gray-600">
            <p class="mb-4">
              Vue Playground is more than just a demo application—it's a carefully crafted example of how to build scalable, maintainable Vue.js applications using industry best practices and modern development patterns.
            </p>
            <p class="mb-4">
              Built from the ground up with <strong>Feature-Sliced Design (FSD)</strong>, this project demonstrates how to organize code in a way that supports team collaboration, reduces coupling, and maintains clear boundaries between different parts of your application.
            </p>
            <p>
              Whether you're a solo developer looking to improve your architecture skills or part of a team building enterprise applications, this playground provides practical examples you can adapt to your own projects.
            </p>
          </div>
        </div>

        <!-- Architecture Deep Dive -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-lg">
          <h2 class="mb-6 text-3xl font-bold text-gray-900">
            Architecture Deep Dive
          </h2>

          <div
            class="
              grid gap-8
              md:grid-cols-2
            "
          >
            <!-- FSD Layers -->
            <div>
              <h3 class="mb-4 text-xl font-semibold text-gray-900">
                Feature-Sliced Design Layers
              </h3>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <div
                    class="
                      mt-0.5 flex h-6 w-6 items-center justify-center
                      rounded-full bg-blue-100
                    "
                  >
                    <div class="h-2 w-2 rounded-full bg-blue-600" />
                  </div>
                  <div>
                    <strong class="text-gray-900">App Layer</strong>
                    <p class="text-sm text-gray-600">
                      Application-wide configuration, providers, and global setup
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div
                    class="
                      mt-0.5 flex h-6 w-6 items-center justify-center
                      rounded-full bg-green-100
                    "
                  >
                    <div class="h-2 w-2 rounded-full bg-green-600" />
                  </div>
                  <div>
                    <strong class="text-gray-900">Pages Layer</strong>
                    <p class="text-sm text-gray-600">
                      Route-level components with file-based routing
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div
                    class="
                      mt-0.5 flex h-6 w-6 items-center justify-center
                      rounded-full bg-purple-100
                    "
                  >
                    <div class="h-2 w-2 rounded-full bg-purple-600" />
                  </div>
                  <div>
                    <strong class="text-gray-900">Widgets Layer</strong>
                    <p class="text-sm text-gray-600">
                      Complex UI blocks and layout components
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div
                    class="
                      mt-0.5 flex h-6 w-6 items-center justify-center
                      rounded-full bg-yellow-100
                    "
                  >
                    <div class="h-2 w-2 rounded-full bg-yellow-600" />
                  </div>
                  <div>
                    <strong class="text-gray-900">Features Layer</strong>
                    <p class="text-sm text-gray-600">
                      Business logic features with complete user workflows
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div
                    class="
                      mt-0.5 flex h-6 w-6 items-center justify-center
                      rounded-full bg-red-100
                    "
                  >
                    <div class="h-2 w-2 rounded-full bg-red-600" />
                  </div>
                  <div>
                    <strong class="text-gray-900">Entities Layer</strong>
                    <p class="text-sm text-gray-600">
                      Business entities and domain-specific logic
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div
                    class="
                      mt-0.5 flex h-6 w-6 items-center justify-center
                      rounded-full bg-gray-100
                    "
                  >
                    <div class="h-2 w-2 rounded-full bg-gray-600" />
                  </div>
                  <div>
                    <strong class="text-gray-900">Shared Layer</strong>
                    <p class="text-sm text-gray-600">
                      Reusable utilities, components, and configurations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Technology Stack -->
            <div>
              <h3 class="mb-4 text-xl font-semibold text-gray-900">
                Technology Stack
              </h3>
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <div
                    class="
                      flex h-8 w-8 items-center justify-center rounded
                      bg-green-100
                    "
                  >
                    <span class="text-sm font-bold text-green-600">V</span>
                  </div>
                  <div>
                    <strong class="text-gray-900">Vue 3</strong>
                    <p class="text-sm text-gray-600">
                      Composition API, reactive system, and modern Vue features
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <div
                    class="
                      flex h-8 w-8 items-center justify-center rounded
                      bg-blue-100
                    "
                  >
                    <span class="text-sm font-bold text-blue-600">TS</span>
                  </div>
                  <div>
                    <strong class="text-gray-900">TypeScript</strong>
                    <p class="text-sm text-gray-600">
                      Full type safety with strict configuration
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <div
                    class="
                      flex h-8 w-8 items-center justify-center rounded
                      bg-purple-100
                    "
                  >
                    <span class="text-sm font-bold text-purple-600">⚡</span>
                  </div>
                  <div>
                    <strong class="text-gray-900">Vite</strong>
                    <p class="text-sm text-gray-600">
                      Lightning-fast build tool with Rolldown integration
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <div
                    class="
                      flex h-8 w-8 items-center justify-center rounded
                      bg-yellow-100
                    "
                  >
                    <span class="text-sm font-bold text-yellow-600">🥟</span>
                  </div>
                  <div>
                    <strong class="text-gray-900">Bun</strong>
                    <p class="text-sm text-gray-600">
                      Fast package manager and JavaScript runtime
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <div
                    class="
                      flex h-8 w-8 items-center justify-center rounded
                      bg-cyan-100
                    "
                  >
                    <span class="text-sm font-bold text-cyan-600">CSS</span>
                  </div>
                  <div>
                    <strong class="text-gray-900">Tailwind CSS v4</strong>
                    <p class="text-sm text-gray-600">
                      Modern CSS framework with design system
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <div
                    class="
                      flex h-8 w-8 items-center justify-center rounded
                      bg-indigo-100
                    "
                  >
                    <span class="text-sm font-bold text-indigo-600">P</span>
                  </div>
                  <div>
                    <strong class="text-gray-900">Pinia</strong>
                    <p class="text-sm text-gray-600">
                      Modern state management with Composition API
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Showcase -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-lg">
          <h2 class="mb-6 text-3xl font-bold text-gray-900">
            What You'll Find Here
          </h2>

          <div
            class="
              grid gap-8
              md:grid-cols-2
            "
          >
            <div>
              <h3 class="mb-4 text-xl font-semibold text-gray-900">
                🔐 Authentication System
              </h3>
              <p class="mb-4 text-gray-600">
                Complete authentication flow with login/register forms, form validation using Zod schemas, and secure state management.
              </p>
              <ul class="space-y-1 text-sm text-gray-600">
                <li>• Form validation with real-time feedback</li>
                <li>• Secure token-based authentication</li>
                <li>• User session management</li>
                <li>• Auth-specific layouts and routing</li>
              </ul>
            </div>

            <div>
              <h3 class="mb-4 text-xl font-semibold text-gray-900">
                📊 Dashboard Interface
              </h3>
              <p class="mb-4 text-gray-600">
                Responsive dashboard layout with sidebar navigation, multiple widgets, and interactive components.
              </p>
              <ul class="space-y-1 text-sm text-gray-600">
                <li>• Responsive sidebar navigation</li>
                <li>• Widget-based layout system</li>
                <li>• Interactive data displays</li>
                <li>• Mobile-friendly design</li>
              </ul>
            </div>

            <div>
              <h3 class="mb-4 text-xl font-semibold text-gray-900">
                👤 User Profile Management
              </h3>
              <p class="mb-4 text-gray-600">
                Complete user profile system with avatar uploads, profile editing, and settings management.
              </p>
              <ul class="space-y-1 text-sm text-gray-600">
                <li>• Profile picture upload with validation</li>
                <li>• Form-based profile editing</li>
                <li>• Avatar placeholder generation</li>
                <li>• Settings persistence</li>
              </ul>
            </div>

            <div>
              <h3 class="mb-4 text-xl font-semibold text-gray-900">
                🎨 Component Library
              </h3>
              <p class="mb-4 text-gray-600">
                Beautiful, accessible UI components built with Reka UI and following design system principles.
              </p>
              <ul class="space-y-1 text-sm text-gray-600">
                <li>• Consistent design tokens</li>
                <li>• Accessible component patterns</li>
                <li>• Dark/light theme support</li>
                <li>• Responsive component variants</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Development Experience -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-lg">
          <h2 class="mb-6 text-3xl font-bold text-gray-900">
            Developer Experience
          </h2>

          <div
            class="
              grid gap-6
              md:grid-cols-3
            "
          >
            <div class="text-center">
              <div
                class="
                  mx-auto mb-4 flex h-16 w-16 items-center justify-center
                  rounded-full bg-green-100
                "
              >
                <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="mb-2 text-lg font-semibold text-gray-900">
                Type Safety
              </h3>
              <p class="text-sm text-gray-600">
                Comprehensive TypeScript integration with strict typing across all layers
              </p>
            </div>

            <div class="text-center">
              <div
                class="
                  mx-auto mb-4 flex h-16 w-16 items-center justify-center
                  rounded-full bg-blue-100
                "
              >
                <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="mb-2 text-lg font-semibold text-gray-900">
                Fast Development
              </h3>
              <p class="text-sm text-gray-600">
                Hot module replacement and instant feedback with Vite and modern tooling
              </p>
            </div>

            <div class="text-center">
              <div
                class="
                  mx-auto mb-4 flex h-16 w-16 items-center justify-center
                  rounded-full bg-purple-100
                "
              >
                <svg class="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 class="mb-2 text-lg font-semibold text-gray-900">
                Quality Assurance
              </h3>
              <p class="text-sm text-gray-600">
                ESLint, Prettier, and testing setup for consistent, reliable code
              </p>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center">
          <h2 class="mb-4 text-2xl font-bold text-gray-900">
            Ready to Explore?
          </h2>
          <p class="mx-auto mb-8 max-w-2xl text-gray-600">
            Dive into the codebase, try out the features, and see how Feature-Sliced Design can improve your Vue.js development workflow.
          </p>
          <div
            class="
              flex flex-col justify-center gap-4
              sm:flex-row
            "
          >
            <Button size="lg" class="px-8 py-3">
              <router-link to="/dashboard">
                Explore Dashboard
              </router-link>
            </Button>
            <Button variant="outline" size="lg" class="px-8 py-3">
              <router-link to="/auth/login">
                Try Authentication
              </router-link>
            </Button>
            <Button variant="ghost" size="lg" class="px-8 py-3">
              <router-link to="/">
                Back to Home
              </router-link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.prose p {
  margin-bottom: 1rem;
}
</style>

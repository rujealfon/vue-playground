<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import { Button } from '@/shared/ui'

const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <header class="border-b border-gray-200 bg-white shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-3">
            <div
              class="
                flex h-8 w-8 items-center justify-center rounded-lg
                bg-gradient-to-br from-blue-600 to-purple-600
              "
            >
              <span class="text-sm font-bold text-white">VP</span>
            </div>
            <span class="text-xl font-bold text-gray-900">Vue Playground</span>
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <nav
          class="
            hidden items-center space-x-8
            md:flex
          "
        >
          <RouterLink
            to="/"
            class="
              font-medium text-gray-700 transition-colors duration-200
              hover:text-blue-600
            "
            active-class="text-blue-600"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/about"
            class="
              font-medium text-gray-700 transition-colors duration-200
              hover:text-blue-600
            "
            active-class="text-blue-600"
          >
            About
          </RouterLink>
          <RouterLink
            to="/dashboard"
            class="
              font-medium text-gray-700 transition-colors duration-200
              hover:text-blue-600
            "
            active-class="text-blue-600"
          >
            Dashboard
          </RouterLink>
        </nav>

        <!-- Desktop Actions -->
        <div
          class="
            hidden items-center space-x-4
            md:flex
          "
        >
          <Button variant="ghost" class="px-4 py-2">
            <RouterLink to="/auth/login">
              Sign In
            </RouterLink>
          </Button>
          <Button class="px-4 py-2">
            <RouterLink to="/auth/login">
              Get Started
            </RouterLink>
          </Button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            type="button"
            class="
              text-gray-700 transition-colors duration-200
              hover:text-blue-600
              focus:text-blue-600 focus:outline-none
            "
            @click="toggleMobileMenu"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="mobileMenuOpen" class="
          border-t border-gray-200
          md:hidden
        "
      >
        <div class="space-y-1 px-2 pt-2 pb-3">
          <RouterLink
            to="/"
            class="
              block rounded-md px-3 py-2 font-medium text-gray-700
              transition-colors duration-200
              hover:bg-gray-50 hover:text-blue-600
            "
            active-class="text-blue-600 bg-blue-50"
            @click="mobileMenuOpen = false"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/about"
            class="
              block rounded-md px-3 py-2 font-medium text-gray-700
              transition-colors duration-200
              hover:bg-gray-50 hover:text-blue-600
            "
            active-class="text-blue-600 bg-blue-50"
            @click="mobileMenuOpen = false"
          >
            About
          </RouterLink>
          <RouterLink
            to="/dashboard"
            class="
              block rounded-md px-3 py-2 font-medium text-gray-700
              transition-colors duration-200
              hover:bg-gray-50 hover:text-blue-600
            "
            active-class="text-blue-600 bg-blue-50"
            @click="mobileMenuOpen = false"
          >
            Dashboard
          </RouterLink>
        </div>
        <div class="space-y-3 border-t border-gray-200 px-2 pt-4 pb-3">
          <RouterLink
            to="/auth/login"
            class="block"
            @click="mobileMenuOpen = false"
          >
            <Button variant="ghost" class="w-full justify-center">
              Sign In
            </Button>
          </RouterLink>
          <RouterLink
            to="/auth/login"
            class="block"
            @click="mobileMenuOpen = false"
          >
            <Button class="w-full justify-center">
              Get Started
            </Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

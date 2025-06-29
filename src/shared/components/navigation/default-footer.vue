<script setup lang="ts">
import { APP_CONFIG } from '@/shared/constants/app'

const currentYear = new Date().getFullYear()

const footerLinks = [
  {
    title: 'Product',
    links: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Features', href: '/about' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '#' },
      { name: 'Help Center', href: '#' },
    ],
  },
]
</script>

<template>
  <footer class="border-t bg-gray-50">
    <div class="container mx-auto px-4 py-12">
      <div
        class="
          grid grid-cols-1 gap-8
          md:grid-cols-4
        "
      >
        <!-- Brand Section -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ APP_CONFIG.NAME }}
          </h3>
          <p class="text-sm text-gray-600">
            {{ APP_CONFIG.DESCRIPTION }}
          </p>
          <p class="text-xs text-gray-500">
            Version {{ APP_CONFIG.VERSION }}
          </p>
        </div>

        <!-- Links Sections -->
        <div
          v-for="section in footerLinks"
          :key="section.title"
          class="space-y-4"
        >
          <h4 class="text-sm font-semibold text-gray-900">
            {{ section.title }}
          </h4>
          <ul class="space-y-2">
            <li v-for="link in section.links" :key="link.name">
              <RouterLink
                :to="link.href"
                class="
                  text-sm text-gray-600
                  hover:text-gray-900
                "
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-8 border-t pt-8">
        <div
          class="
            flex flex-col items-center justify-between space-y-4
            md:flex-row md:space-y-0
          "
        >
          <p class="text-sm text-gray-600">
            © {{ currentYear }} {{ APP_CONFIG.NAME }}. All rights reserved.
          </p>

          <div class="flex space-x-6">
            <a
              href="#"
              class="
                text-sm text-gray-600
                hover:text-gray-900
              "
            >
              Privacy Policy
            </a>
            <a
              href="#"
              class="
                text-sm text-gray-600
                hover:text-gray-900
              "
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

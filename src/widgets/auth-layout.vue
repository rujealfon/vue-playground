<script setup lang="ts">
type Props = {
  title?: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Left side - Branding -->
    <div
      class="
        flex flex-1 items-center justify-center bg-gradient-to-br from-blue-600
        to-purple-700 p-8
      "
    >
      <div class="max-w-md text-center text-white">
        <h1 class="mb-4 text-4xl font-bold">
          Vue Playground
        </h1>
        <p class="text-xl opacity-90">
          Experience modern Vue.js development with Feature-Sliced Design architecture
        </p>
        <div class="mt-8 space-y-2 text-sm opacity-75">
          <p>✨ Vue 3 + TypeScript</p>
          <p>🎨 Tailwind CSS + Shadcn/ui</p>
          <p>🏗️ Feature-Sliced Design</p>
          <p>⚡ Vite + Bun</p>
        </div>
      </div>
    </div>

    <!-- Right side - Content -->
    <div class="flex flex-1 items-center justify-center bg-gray-50 p-8">
      <div class="w-full max-w-md">
        <slot />
      </div>
    </div>
  </div>
</template>

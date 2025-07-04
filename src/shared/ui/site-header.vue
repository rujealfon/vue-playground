<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold text-green-600">
      {{ msg }}
    </h1>
    <h3 class="text-lg text-gray-600">
      You've successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener" class="text-blue-600 hover:underline">
        Vite
      </a>
      +
      <a href="https://vuejs.org/" target="_blank" rel="noopener" class="text-blue-600 hover:underline">
        Vue 3
      </a>
      using Feature-Sliced Design!
    </h3>
  </div>
</template>
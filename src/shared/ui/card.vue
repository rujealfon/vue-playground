<script setup lang="ts">
type Props = {
  title?: string
  class?: string
}

defineProps<Props>()
</script>

<template>
  <div :class="['bg-white border border-gray-200 rounded-lg shadow-sm', $props.class]">
    <div v-if="title" class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">
        {{ title }}
      </h3>
    </div>
    <div class="px-6 py-4">
      <slot />
    </div>
  </div>
</template>
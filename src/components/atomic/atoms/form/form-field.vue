<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@/lib/utils'

type Props = {
  label?: string
  error?: string
  required?: boolean
  hint?: string
  class?: HTMLAttributes['class']
  id?: string
}

defineProps<Props>()
</script>

<template>
  <div :class="cn('space-y-2', $props.class)">
    <div
      v-if="label"
      class="
        text-sm leading-none font-medium
        peer-disabled:cursor-not-allowed peer-disabled:opacity-70
      "
    >
      {{ label }}
      <span v-if="required" class="ml-1 text-destructive">*</span>
    </div>

    <div class="relative">
      <slot />
    </div>

    <p v-if="hint && !error" class="text-sm text-muted-foreground">
      {{ hint }}
    </p>

    <p v-if="error" class="text-sm font-medium text-destructive">
      {{ error }}
    </p>
  </div>
</template>

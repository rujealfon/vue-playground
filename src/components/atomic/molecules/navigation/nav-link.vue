<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { cn } from '@/lib/utils'

type Props = {
  to: string
  class?: string
}

defineProps<Props>()
</script>

<template>
  <RouterLink
    :to="to"
    :class="cn(
      `
        text-sm font-medium transition-colors
        hover:text-primary
      `,
      'data-[active]:font-semibold data-[active]:text-primary',
      $props.class,
    )"
    active-class="data-[active]"
  >
    <slot />
  </RouterLink>
</template>

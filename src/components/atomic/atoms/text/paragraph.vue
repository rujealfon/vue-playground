<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@/lib/utils'

type Props = {
  size?: 'sm' | 'base' | 'lg' | 'xl'
  variant?: 'default' | 'muted' | 'subtle'
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  size: 'base',
  variant: 'default'
})

const sizeClasses = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
}

const variantClasses = {
  default: 'leading-7',
  muted: 'text-muted-foreground leading-7',
  subtle: 'text-sm text-muted-foreground'
}
</script>

<template>
  <p :class="cn(sizeClasses[size], variantClasses[variant], props.class)">
    <slot />
  </p>
</template>

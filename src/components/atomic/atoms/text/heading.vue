<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@/lib/utils'

type Props = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  level: 1
})

const Tag = `h${props.level}` as const

const headingClasses = {
  1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
  3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  5: 'scroll-m-20 text-lg font-semibold tracking-tight',
  6: 'scroll-m-20 text-base font-semibold tracking-tight'
}
</script>

<template>
  <component
    :is="Tag"
    :class="cn(headingClasses[level], props.class)"
  >
    <slot />
  </component>
</template>

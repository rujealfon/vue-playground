<script setup lang="ts">
import { useCounterStore } from '@/entities/counter'
import { Button } from '@/shared/ui'

const counterStore = useCounterStore()
</script>

<template>
  <div class="counter-display flex flex-col items-center gap-4">
    <div class="counter-value text-4xl font-bold">
      {{ counterStore.count }}
    </div>
    <div class="counter-double text-2xl text-gray-600">
      Double: {{ counterStore.doubleCount }}
    </div>
    <Button @click="counterStore.increment">
      Increment
    </Button>
  </div>
</template>

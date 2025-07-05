<script setup lang="ts">
import { Button } from '@/shared/ui'

import { useCounterStore } from '../model'

const counterStore = useCounterStore()
</script>

<template>
  <div class="flex min-h-[200px] items-center justify-center">
    <div class="rounded-lg bg-white p-8 text-center shadow-md">
      <h2 class="mb-4 text-2xl font-bold text-gray-900">
        Counter Demo
      </h2>

      <div class="mb-4 text-6xl font-bold text-blue-600">
        {{ counterStore.count }}
      </div>

      <div class="mb-6 text-sm text-gray-500">
        Double: {{ counterStore.doubleCount }}
      </div>

      <div class="flex justify-center space-x-4">
        <Button
          class="px-6 py-2"
          @click="counterStore.increment"
        >
          Increment
        </Button>

        <Button
          variant="outline"
          class="px-6 py-2"
          @click="counterStore.decrement"
        >
          Decrement
        </Button>

        <Button
          variant="destructive"
          class="px-6 py-2"
          @click="counterStore.reset"
        >
          Reset
        </Button>
      </div>
    </div>
  </div>
</template>

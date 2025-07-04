<script setup lang="ts">
import { CounterDisplay } from '@/features/counter'
import { Button } from '@/shared/ui'
</script>

<template>
  <div
    class="about flex min-h-screen flex-col items-center justify-center gap-8"
  >
    <h1 class="text-4xl font-bold">
      This is an about page
    </h1>

    <CounterDisplay />

    <Button variant="default" @click="() => console.log('clicked')">
      Click me
    </Button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="about flex min-h-screen items-center justify-center">
    <h1>This is an about page</h1>
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

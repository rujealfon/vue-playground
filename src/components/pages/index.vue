<script setup lang="ts">
import { Heading, Paragraph } from '@atoms/text'
import { Button } from '@atoms/ui'
import { HeroSection } from '@molecules/hero'

import { useCounterStore } from '@/stores'

const counterStore = useCounterStore()
</script>

<template>
  <main>
    <HeroSection
      title="Welcome to Vue Playground"
      subtitle="A modern Vue 3 application with atomic design"
      description="Built with Vue 3, TypeScript, Tailwind CSS, and shadcn-vue components following atomic design principles."
      :primary-action="{ text: 'Get Started', to: '/about' }"
      :secondary-action="{ text: 'Sign Up', to: '/register' }"
    />

    <section class="px-4 py-16">
      <div class="mx-auto max-w-4xl space-y-8 text-center">
        <Heading :level="2">
          Counter Demo
        </Heading>
        <Paragraph>
          This counter demonstrates Pinia store integration in our atomic design system.
        </Paragraph>

        <div class="flex flex-col items-center space-y-4">
          <div class="text-6xl font-bold text-primary">
            {{ counterStore.count }}
          </div>
          <div class="text-xl text-muted-foreground">
            Double count: {{ counterStore.doubleCount }}
          </div>
          <Button size="lg" @click="counterStore.increment">
            Increment Counter
          </Button>
        </div>
      </div>
    </section>
  </main>
</template>

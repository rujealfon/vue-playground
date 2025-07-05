<script setup lang="ts">
import { Heading, Paragraph } from '@atoms/text'
import { Button } from '@atoms/ui'

import { useAuthStore } from '@/stores'

const authStore = useAuthStore()

async function handleLogout() {
  await authStore.logout()
}
</script>

<template>
  <main class="px-4 py-16">
    <div class="mx-auto max-w-4xl space-y-8">
      <div class="space-y-4 text-center">
        <Heading :level="1">
          About This Project
        </Heading>
        <Paragraph size="lg" variant="muted">
          A modern Vue 3 application showcasing atomic design principles
        </Paragraph>
      </div>

      <div
        class="
          grid gap-8
          md:grid-cols-2
        "
      >
        <div class="space-y-4">
          <Heading :level="3">
            Tech Stack
          </Heading>
          <ul class="space-y-2 text-muted-foreground">
            <li>• Vue 3 with Composition API</li>
            <li>• TypeScript for type safety</li>
            <li>• Tailwind CSS for styling</li>
            <li>• shadcn-vue component library</li>
            <li>• Pinia for state management</li>
            <li>• Vue Router for navigation</li>
            <li>• Vee-validate + Zod for forms</li>
          </ul>
        </div>

        <div class="space-y-4">
          <Heading :level="3">
            Atomic Design
          </Heading>
          <ul class="space-y-2 text-muted-foreground">
            <li>• <strong>Atoms:</strong> Basic UI elements</li>
            <li>• <strong>Molecules:</strong> Simple component groups</li>
            <li>• <strong>Organisms:</strong> Complex component groups</li>
            <li>• <strong>Templates:</strong> Page layouts</li>
            <li>• <strong>Pages:</strong> Complete views</li>
          </ul>
        </div>
      </div>

      <div v-if="authStore.isAuthenticated" class="space-y-4 text-center">
        <Paragraph>
          Welcome back, {{ authStore.userName }}!
        </Paragraph>
        <Button variant="outline" @click="handleLogout">
          Sign Out
        </Button>
      </div>

      <div v-else class="space-y-4 text-center">
        <Paragraph>
          Want to try the authentication system?
        </Paragraph>
        <div class="flex justify-center gap-4">
          <Button as="RouterLink" to="/login">
            Sign In
          </Button>
          <Button as="RouterLink" to="/register" variant="outline">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  </main>
</template>

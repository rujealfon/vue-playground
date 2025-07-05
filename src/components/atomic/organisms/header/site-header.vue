<script setup lang="ts">
import { Button } from '@atoms/ui'
import { NavLink } from '@molecules/navigation'

import { useAuthStore, useNavigationStore } from '@/stores'

const authStore = useAuthStore()
const navStore = useNavigationStore()

const visibleNavItems = navStore.visibleNavItems(authStore.isAuthenticated)
</script>

<template>
  <header
    class="
      sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur
      supports-[backdrop-filter]:bg-background/60
    "
  >
    <div class="container flex h-14 items-center">
      <div
        class="
          mr-4 hidden
          md:flex
        "
      >
        <RouterLink to="/" class="mr-6 flex items-center space-x-2">
          <span
            class="
              hidden font-bold
              sm:inline-block
            "
          >Vue Playground</span>
        </RouterLink>
        <nav class="flex items-center space-x-6 text-sm font-medium">
          <NavLink
            v-for="item in visibleNavItems"
            :key="item.to"
            :to="item.to"
          >
            {{ item.label }}
          </NavLink>
        </nav>
      </div>

      <div
        class="
          flex flex-1 items-center justify-between space-x-2
          md:justify-end
        "
      >
        <div
          class="
            w-full flex-1
            md:w-auto md:flex-none
          "
        >
          <!-- Mobile menu button could go here -->
        </div>

        <nav class="flex items-center space-x-2">
          <div
            v-if="authStore.isAuthenticated" class="flex items-center space-x-2"
          >
            <span class="text-sm text-muted-foreground">
              Welcome, {{ authStore.userName }}
            </span>
            <Button variant="outline" size="sm" @click="authStore.logout">
              Sign Out
            </Button>
          </div>
          <div
            v-else class="
              hidden items-center space-x-2
              md:flex
            "
          >
            <Button variant="ghost" size="sm" as="RouterLink" to="/login">
              Sign In
            </Button>
            <Button size="sm" as="RouterLink" to="/register">
              Sign Up
            </Button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

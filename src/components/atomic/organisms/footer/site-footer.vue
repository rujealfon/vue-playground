<script setup lang="ts">
import { NavLink } from '@molecules/navigation'
</script>

<template>
  <footer class="border-t bg-background">
    <div
      class="
        container flex flex-col items-center justify-between gap-4 py-10
        md:h-24 md:flex-row md:py-0
      "
    >
      <div
        class="
          flex flex-col items-center gap-4 px-8
          md:flex-row md:gap-2 md:px-0
        "
      >
        <p
          class="
            text-center text-sm leading-loose text-muted-foreground
            md:text-left
          "
        >
          Built with Vue 3, TypeScript, and atomic design principles.
        </p>
      </div>

      <div class="flex items-center space-x-4">
        <NavLink to="/">
          Home
        </NavLink>
        <NavLink to="/about">
          About
        </NavLink>
        <a
          href="https://github.com/anthropics/claude-code"
          target="_blank"
          rel="noopener noreferrer"
          class="
            text-sm font-medium transition-colors
            hover:text-primary
          "
        >
          GitHub
        </a>
      </div>
    </div>
  </footer>
</template>

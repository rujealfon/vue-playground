<script setup lang="ts">
import { ref } from 'vue'

type Props = {
  title?: string
  description?: string
}

defineProps<Props>()

const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <div
      class="
        fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg
        transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
      "
      :class="{ '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }"
    >
      <div
        class="
          flex h-16 items-center justify-between border-b border-gray-200 px-6
        "
      >
        <h2 class="text-lg font-semibold text-gray-900">
          Dashboard
        </h2>
        <button
          class="
            rounded-md p-2
            hover:bg-gray-100
            lg:hidden
          "
          @click="toggleSidebar"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav class="mt-6 px-6">
        <div class="space-y-2">
          <a
            href="#" class="
              flex items-center rounded-md px-3 py-2 text-sm font-medium
              text-gray-700
              hover:bg-gray-100
            "
          >
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            Overview
          </a>
          <a
            href="#" class="
              flex items-center rounded-md px-3 py-2 text-sm font-medium
              text-gray-700
              hover:bg-gray-100
            "
          >
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analytics
          </a>
          <a
            href="#" class="
              flex items-center rounded-md px-3 py-2 text-sm font-medium
              text-gray-700
              hover:bg-gray-100
            "
          >
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            Users
          </a>
          <a
            href="#" class="
              flex items-center rounded-md px-3 py-2 text-sm font-medium
              text-gray-700
              hover:bg-gray-100
            "
          >
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </a>
        </div>
      </nav>
    </div>

    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen"
      class="
        bg-opacity-50 fixed inset-0 z-40 bg-black
        lg:hidden
      "
      role="button"
      tabindex="0"
      aria-label="Close sidebar"
      @click="toggleSidebar"
      @keydown.enter="toggleSidebar"
      @keydown.space="toggleSidebar"
    />

    <!-- Main content area -->
    <div
      class="
        flex flex-1 flex-col
        lg:ml-0
      "
    >
      <!-- Top bar -->
      <div
        class="
          flex h-16 items-center justify-between border-b border-gray-200
          bg-white px-6
        "
      >
        <button
          class="
            rounded-md p-2
            hover:bg-gray-100
            lg:hidden
          "
          @click="toggleSidebar"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div class="flex items-center space-x-4">
          <button
            class="
              rounded-md p-2
              hover:bg-gray-100
            "
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5-5-5h5V3h5v14z" />
            </svg>
          </button>
          <button
            class="
              rounded-md p-2
              hover:bg-gray-100
            "
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Page content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

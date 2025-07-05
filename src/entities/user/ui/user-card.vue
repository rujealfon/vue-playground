<script setup lang="ts">
import { computed } from 'vue'

import type { User } from '@/shared/types'

import { generateAvatarPlaceholder } from '@/shared/lib/avatar'

import { formatUserDisplayName } from '../lib'

type Props = {
  user: User
  showEmail?: boolean
  clickable?: boolean
}

type Emits = {
  click: [user: User]
}

const props = withDefaults(defineProps<Props>(), {
  showEmail: true,
  clickable: false
})

const emit = defineEmits<Emits>()

const displayName = computed(() => formatUserDisplayName(props.user))
const avatarSrc = computed(() =>
  props.user.avatar || generateAvatarPlaceholder(props.user.name)
)

function handleClick() {
  if (props.clickable) {
    emit('click', props.user)
  }
}
</script>

<template>
  <!-- eslint-disable-next-line vue-a11y/no-static-element-interactions -->
  <div
    class="
      flex items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm
      transition-shadow
      hover:shadow-md
    "
    :class="{ 'cursor-pointer hover:bg-gray-50': clickable }"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space="handleClick"
  >
    <div class="mr-4 flex-shrink-0">
      <img
        :src="avatarSrc"
        :alt="`${displayName} avatar`"
        class="h-12 w-12 rounded-full object-cover"
      >
    </div>

    <div class="min-w-0 flex-1">
      <p class="truncate text-sm font-medium text-gray-900">
        {{ displayName }}
      </p>
      <p v-if="showEmail" class="truncate text-sm text-gray-500">
        {{ user.email }}
      </p>
    </div>

    <div v-if="clickable" class="ml-4 flex-shrink-0">
      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
</template>

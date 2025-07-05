<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'

import type { User } from '@/shared/types'

import { generateAvatarPlaceholder } from '@/shared/lib/avatar'
import { Button } from '@/shared/ui'

import { updateProfileSchema } from '../lib'
import { useUserProfileStore } from '../model'

type Props = {
  user: User | null
}

type Emits = {
  profileUpdated: [user: User]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const userProfileStore = useUserProfileStore()

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: toTypedSchema(updateProfileSchema),
  initialValues: {
    name: props.user?.name || '',
    email: props.user?.email || ''
  }
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')

const avatarPreview = ref<string | null>(null)
const avatarFile = ref<File | null>(null)

const currentAvatar = computed(() => {
  if (avatarPreview.value)
    return avatarPreview.value
  if (props.user?.avatar)
    return props.user.avatar
  if (props.user?.name)
    return generateAvatarPlaceholder(props.user.name)
  return null
})

function handleAvatarChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    avatarFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const onSubmit = handleSubmit(async (values) => {
  let avatarUrl = props.user?.avatar

  // Upload avatar if changed
  if (avatarFile.value) {
    const uploadedAvatar = await userProfileStore.uploadAvatar(avatarFile.value)
    if (uploadedAvatar) {
      avatarUrl = uploadedAvatar
    }
  }

  // Update profile
  const updatedUser = await userProfileStore.updateProfile({
    ...values,
    avatar: avatarUrl
  })

  if (updatedUser) {
    emit('profileUpdated', updatedUser)
    avatarPreview.value = null
    avatarFile.value = null
  }
})

function handleCancel() {
  resetForm()
  avatarPreview.value = null
  avatarFile.value = null
}
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <div class="rounded-lg bg-white p-8 shadow-md">
      <h2 class="mb-6 text-2xl font-bold text-gray-900">
        Profile Settings
      </h2>

      <form class="space-y-6" @submit="onSubmit">
        <!-- Avatar Section -->
        <div class="flex items-center space-x-6">
          <div class="relative">
            <img
              v-if="currentAvatar"
              :src="currentAvatar"
              alt="Profile avatar"
              class="h-20 w-20 rounded-full object-cover"
            >
            <div
              v-else
              class="
                flex h-20 w-20 items-center justify-center rounded-full
                bg-gray-200
              "
            >
              <span class="text-sm text-gray-500">No Image</span>
            </div>
            <div
              v-if="userProfileStore.isUploadingAvatar"
              class="
                bg-opacity-50 absolute inset-0 flex items-center justify-center
                rounded-full bg-black
              "
            >
              <span class="text-xs text-white">Uploading...</span>
            </div>
          </div>

          <div>
            <label for="avatar-upload" class="block">
              <span class="sr-only">Choose avatar</span>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                class="
                  block w-full text-sm text-gray-500
                  file:mr-4 file:rounded-full file:border-0 file:bg-blue-50
                  file:px-4 file:py-2 file:text-sm file:font-semibold
                  file:text-blue-700
                  hover:file:bg-blue-100
                "
                @change="handleAvatarChange"
              >
            </label>
            <p class="mt-1 text-sm text-gray-600">
              PNG, JPG, GIF up to 2MB
            </p>
          </div>
        </div>

        <!-- Name Field -->
        <div>
          <label
            for="profile-name"
            class="block text-sm font-medium text-gray-700"
          >
            Full Name
            <input
              id="profile-name"
              v-model="name"
              v-bind="nameAttrs"
              type="text"
              autocomplete="name"
              class="
                mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                focus:border-transparent focus:ring-2 focus:ring-blue-500
                focus:outline-none
              "
              :class="{ 'border-red-500': errors.name }"
            >
          </label>
          <p v-if="errors.name" class="mt-1 text-sm text-red-600">
            {{ errors.name }}
          </p>
        </div>

        <!-- Email Field -->
        <div>
          <label
            for="profile-email"
            class="block text-sm font-medium text-gray-700"
          >
            Email Address
            <input
              id="profile-email"
              v-model="email"
              v-bind="emailAttrs"
              type="email"
              autocomplete="email"
              class="
                mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                focus:border-transparent focus:ring-2 focus:ring-blue-500
                focus:outline-none
              "
              :class="{ 'border-red-500': errors.email }"
            >
          </label>
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">
            {{ errors.email }}
          </p>
        </div>

        <!-- Error Message -->
        <div v-if="userProfileStore.error" class="text-sm text-red-600">
          {{ userProfileStore.error }}
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-4">
          <Button
            type="submit"
            :disabled="userProfileStore.isUpdating || userProfileStore.isUploadingAvatar"
            class="px-6 py-2"
          >
            {{ userProfileStore.isUpdating ? 'Updating...' : 'Update Profile' }}
          </Button>

          <Button
            type="button"
            variant="outline"
            class="px-6 py-2"
            @click="handleCancel"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { User } from '@/shared/types'

import type { ChangePasswordData, UpdateProfileData } from '../api'

import { userProfileApi } from '../api'

export const useUserProfileStore = defineStore('userProfile', () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isUpdating = ref(false)
  const isUploadingAvatar = ref(false)

  const updateProfile = async (data: UpdateProfileData): Promise<User | null> => {
    try {
      isUpdating.value = true
      error.value = null

      const response = await userProfileApi.updateProfile(data)

      if (response.success) {
        return response.data
      }
      else {
        error.value = response.message
        return null
      }
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Profile update failed'
      return null
    }
    finally {
      isUpdating.value = false
    }
  }

  const changePassword = async (data: ChangePasswordData): Promise<boolean> => {
    try {
      isLoading.value = true
      error.value = null

      const response = await userProfileApi.changePassword(data)

      if (response.success) {
        return true
      }
      else {
        error.value = response.message
        return false
      }
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Password change failed'
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  const uploadAvatar = async (file: File): Promise<string | null> => {
    try {
      isUploadingAvatar.value = true
      error.value = null

      const response = await userProfileApi.uploadAvatar(file)

      if (response.success) {
        return response.data.avatar
      }
      else {
        error.value = response.message
        return null
      }
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Avatar upload failed'
      return null
    }
    finally {
      isUploadingAvatar.value = false
    }
  }

  const deleteAccount = async (): Promise<boolean> => {
    try {
      isLoading.value = true
      error.value = null

      const response = await userProfileApi.deleteAccount()

      if (response.success) {
        return true
      }
      else {
        error.value = response.message
        return false
      }
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Account deletion failed'
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    isUpdating,
    isUploadingAvatar,
    updateProfile,
    changePassword,
    uploadAvatar,
    deleteAccount
  }
})

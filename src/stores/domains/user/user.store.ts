import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { User } from '@/api/types'

export const useUserStore = defineStore('user', () => {
  // State
  const users = ref<User[]>([])
  const selectedUser = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const userCount = computed(() => users.value.length)
  const hasUsers = computed(() => users.value.length > 0)

  // Actions
  const setUsers = (newUsers: User[]) => {
    users.value = newUsers
  }

  const addUser = (user: User) => {
    users.value.push(user)
  }

  const updateUser = (userId: string, userData: Partial<User>) => {
    const index = users.value.findIndex(user => user.id === userId)
    if (index > -1) {
      users.value[index] = { ...users.value[index], ...userData }
    }
  }

  const removeUser = (userId: string) => {
    const index = users.value.findIndex(user => user.id === userId)
    if (index > -1) {
      users.value.splice(index, 1)
    }
  }

  const selectUser = (userId: string) => {
    selectedUser.value = users.value.find(user => user.id === userId) || null
  }

  const clearSelection = () => {
    selectedUser.value = null
  }

  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading
  }

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  return {
    // State
    users,
    selectedUser,
    loading,
    error,

    // Getters
    userCount,
    hasUsers,

    // Actions
    setUsers,
    addUser,
    updateUser,
    removeUser,
    selectUser,
    clearSelection,
    setLoading,
    setError
  }
})

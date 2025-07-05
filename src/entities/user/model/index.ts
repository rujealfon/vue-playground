import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { User } from '@/shared/types'

export const useUserEntityStore = defineStore('userEntity', () => {
  const users = ref<User[]>([])
  const selectedUser = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed getters
  const getUserById = computed(() => (id: string) => {
    return users.value.find(user => user.id === id)
  })

  const getUsersByName = computed(() => (name: string) => {
    return users.value.filter(user =>
      user.name.toLowerCase().includes(name.toLowerCase())
    )
  })

  const totalUsers = computed(() => users.value.length)

  // Actions
  const addUser = (user: User) => {
    const existingIndex = users.value.findIndex(u => u.id === user.id)
    if (existingIndex >= 0) {
      users.value[existingIndex] = user
    }
    else {
      users.value.push(user)
    }
  }

  const removeUser = (userId: string) => {
    const index = users.value.findIndex(u => u.id === userId)
    if (index >= 0) {
      users.value.splice(index, 1)
    }
  }

  const selectUser = (user: User | null) => {
    selectedUser.value = user
  }

  const clearUsers = () => {
    users.value = []
    selectedUser.value = null
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (err: string | null) => {
    error.value = err
  }

  return {
    users,
    selectedUser,
    isLoading,
    error,
    getUserById,
    getUsersByName,
    totalUsers,
    addUser,
    removeUser,
    selectUser,
    clearUsers,
    setLoading,
    setError
  }
})

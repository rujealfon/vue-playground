import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<Record<string, any> | null>(null)

  function setToken(newToken: string) {
    token.value = newToken
    // You would typically persist this to localStorage or cookies
  }

  function setUser(newUser: Record<string, any>) {
    user.value = newUser
  }

  function logout() {
    token.value = null
    user.value = null
    // And remove from persistence
  }

  return { token, user, setToken, setUser, logout }
})

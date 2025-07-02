import { ref } from 'vue'
import { useRouter } from 'vue-router'

import type { LoginSchema, RegisterSchema } from '@/features/auth/schemas'

import * as authApi from '@/features/auth/api'
import { useAuthStore } from '@/features/auth/stores/auth'

export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  async function login(credentials: LoginSchema) {
    isLoading.value = true
    error.value = null
    try {
      const data = await authApi.loginWithEmailAndPassword(credentials)
      authStore.setToken(data.token)
      authStore.setUser(data.user)
      await router.push('/')
    }
    catch (e) {
      error.value = e as Error
    }
    finally {
      isLoading.value = false
    }
  }

  async function register(credentials: RegisterSchema) {
    isLoading.value = true
    error.value = null
    try {
      await authApi.registerWithEmailAndPassword(credentials)
      await router.push('/login')
    }
    catch (e) {
      error.value = e as Error
    }
    finally {
      isLoading.value = false
    }
  }

  return { login, register, isLoading, error }
}

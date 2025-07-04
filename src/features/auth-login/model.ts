import { ref } from 'vue'

import type { LoginCredentials } from '@/entities/user'

import { useUserStore } from '@/entities/user'
import { authApi } from '@/shared/api'

export function useLoginForm() {
  const userStore = useUserStore()

  const form = ref<LoginCredentials>({
    email: '',
    password: ''
  })

  const errors = ref<Partial<Record<keyof LoginCredentials, string>>>({})
  const isSubmitting = ref(false)

  const validateForm = (): boolean => {
    errors.value = {}
    let isValid = true

    if (!form.value.email) {
      errors.value.email = 'Email is required'
      isValid = false
    }
    else if (!/\S[^\s@]*@\S+\.\S+/.test(form.value.email)) {
      errors.value.email = 'Email is not valid'
      isValid = false
    }

    if (!form.value.password) {
      errors.value.password = 'Password is required'
      isValid = false
    }
    else if (form.value.password.length < 6) {
      errors.value.password = 'Password must be at least 6 characters'
      isValid = false
    }

    return isValid
  }

  const submitLogin = async (): Promise<boolean> => {
    if (!validateForm()) {
      return false
    }

    isSubmitting.value = true
    userStore.setLoading(true)
    userStore.setError(null)

    try {
      const response = await authApi.login(form.value)

      // Store token in localStorage
      localStorage.setItem('auth_token', response.token)

      // Update user store
      userStore.setUser(response.user)

      return true
    }
    catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      userStore.setError(errorMessage)
      return false
    }
    finally {
      isSubmitting.value = false
      userStore.setLoading(false)
    }
  }

  const clearForm = () => {
    form.value = {
      email: '',
      password: ''
    }
    errors.value = {}
  }

  return {
    form,
    errors,
    isSubmitting,
    submitLogin,
    clearForm
  }
}

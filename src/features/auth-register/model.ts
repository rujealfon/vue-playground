import { ref } from 'vue'

import type { RegisterData } from '@/entities/user'

import { useUserStore } from '@/entities/user'
import { authApi } from '@/shared/api'

export function useRegisterForm() {
  const userStore = useUserStore()

  const form = ref<RegisterData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  })

  const errors = ref<Partial<Record<keyof RegisterData, string>>>({})
  const isSubmitting = ref(false)

  const validateForm = (): boolean => {
    errors.value = {}
    let isValid = true

    if (!form.value.name.trim()) {
      errors.value.name = 'Name is required'
      isValid = false
    }
    else if (form.value.name.trim().length < 2) {
      errors.value.name = 'Name must be at least 2 characters'
      isValid = false
    }

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

    if (!form.value.confirmPassword) {
      errors.value.confirmPassword = 'Please confirm your password'
      isValid = false
    }
    else if (form.value.password !== form.value.confirmPassword) {
      errors.value.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    return isValid
  }

  const submitRegister = async (): Promise<boolean> => {
    if (!validateForm()) {
      return false
    }

    isSubmitting.value = true
    userStore.setLoading(true)
    userStore.setError(null)

    try {
      const response = await authApi.register(form.value)

      // Store token in localStorage
      localStorage.setItem('auth_token', response.token)

      // Update user store
      userStore.setUser(response.user)

      return true
    }
    catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed'
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
      password: '',
      confirmPassword: '',
      name: ''
    }
    errors.value = {}
  }

  return {
    form,
    errors,
    isSubmitting,
    submitRegister,
    clearForm
  }
}

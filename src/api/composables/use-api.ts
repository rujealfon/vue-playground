import type { Ref } from 'vue'

import { ref } from 'vue'

export type UseApiReturn<T> = {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<string | null>
  execute: (...args: any[]) => Promise<T | null>
  reset: () => void
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<{ data: T, success: boolean, message?: string }>
): UseApiReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<string | null>(null)

  const execute = async (...args: any[]): Promise<T | null> => {
    try {
      loading.value = true
      error.value = null

      const response = await apiFunction(...args)

      if (response.success) {
        data.value = response.data
        return response.data
      }
      else {
        throw new Error(response.message || 'API call failed')
      }
    }
    catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      error.value = errorMessage
      return null
    }
    finally {
      loading.value = false
    }
  }

  const reset = () => {
    data.value = null
    loading.value = false
    error.value = null
  }

  return {
    data,
    loading,
    error,
    execute,
    reset
  }
}

import { ref } from 'vue'

export function useLoading(initialState = false) {
  const isLoading = ref(initialState)

  const setLoading = (state: boolean) => {
    isLoading.value = state
  }

  const withLoading = async <T>(fn: () => Promise<T>): Promise<T> => {
    setLoading(true)
    try {
      return await fn()
    }
    finally {
      setLoading(false)
    }
  }

  return {
    isLoading,
    setLoading,
    withLoading
  }
}

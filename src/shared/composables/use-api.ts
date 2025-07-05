import type { Ref } from 'vue'

import { ref } from 'vue'

import type { ApiResponse } from '../types'

import { ApiClient } from '../api'
import { APP_CONFIG } from '../config'

export type UseApiOptions = {
  immediate?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

export function useApi<T = any>(
  endpoint: string,
  options: UseApiOptions = {}
) {
  const { immediate = false, onSuccess, onError } = options

  const client = new ApiClient(APP_CONFIG.api.baseUrl, APP_CONFIG.api.timeout)

  const data: Ref<T | null> = ref(null)
  const error: Ref<Error | null> = ref(null)
  const loading = ref(false)

  const execute = async (requestOptions?: RequestInit): Promise<ApiResponse<T> | null> => {
    try {
      loading.value = true
      error.value = null

      const response = await client.get<T>(endpoint, requestOptions)

      data.value = response.data
      onSuccess?.(response.data)

      return response
    }
    catch (err) {
      const errorInstance = err instanceof Error ? err : new Error(String(err))
      error.value = errorInstance
      onError?.(errorInstance)
      return null
    }
    finally {
      loading.value = false
    }
  }

  if (immediate) {
    execute()
  }

  return {
    data,
    error,
    loading,
    execute
  }
}

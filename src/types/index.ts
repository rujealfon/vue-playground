// Re-export all types from features
export * from '@/features/auth/types'
export * from '@/features/dashboard/types'
export * from '@/features/shared/types'

// Global app types that don't belong to any specific feature
export type AppConfig = {
  name: string
  version: string
  apiBaseUrl: string
  environment: 'development' | 'staging' | 'production'
}

export type AppState = {
  isInitialized: boolean
  config: AppConfig
  currentRoute: string
}

// Global error types
export type AppError = {
  code?: string
  statusCode?: number
  details?: Record<string, any>
} & Error

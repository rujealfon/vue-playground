import type { z } from 'zod'

import {
  addressSchema,
  contactSchema,
  dateRangeSchema,
  dateSchema,
  dateStringSchema,
  emailSchema,
  fileSchema,
  idSchema,
  imageSchema,
  notificationSchema,
  paginationMetaSchema,
  paginationParamsSchema,
  phoneSchema,
  searchParamsSchema,
  settingsSchema,
  urlSchema
} from '../schemas'

// Re-export schemas
export {
  addressSchema,
  contactSchema,
  dateRangeSchema,
  dateSchema,
  dateStringSchema,
  emailSchema,
  fileSchema,
  idSchema,
  imageSchema,
  notificationSchema,
  paginationMetaSchema,
  paginationParamsSchema,
  phoneSchema,
  searchParamsSchema,
  settingsSchema,
  urlSchema
}

// Inferred types from schemas
export type ID = z.infer<typeof idSchema>
export type Email = z.infer<typeof emailSchema>
export type URL = z.infer<typeof urlSchema>
export type Phone = z.infer<typeof phoneSchema>
export type DateString = z.infer<typeof dateStringSchema>
export type DateRange = z.infer<typeof dateRangeSchema>
export type PaginationParams = z.infer<typeof paginationParamsSchema>
export type PaginationMeta = z.infer<typeof paginationMetaSchema>
export type SearchParams = z.infer<typeof searchParamsSchema>
export type FileData = z.infer<typeof fileSchema>
export type ImageData = z.infer<typeof imageSchema>
export type Address = z.infer<typeof addressSchema>
export type Contact = z.infer<typeof contactSchema>
export type Notification = z.infer<typeof notificationSchema>
export type Settings = z.infer<typeof settingsSchema>

// Generic paginated response type
export type PaginatedResponse<T> = {
  data: T[]
  meta: PaginationMeta
}

// Generic API response types
export type SuccessResponse<T> = {
  success: true
  data: T
  message?: string
}

export type ErrorResponse = {
  success: false
  error: {
    code: string
    message: string
    details?: Record<string, any>
  }
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

// Common UI state types
export type LoadingState = {
  isLoading: boolean
  error: string | null
}

export type AsyncState<T> = {
  data: T | null
} & LoadingState

// Theme types
export type Theme = 'light' | 'dark' | 'system'

// Language types
export type Language = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh'

// Sort order type
export type SortOrder = 'asc' | 'desc'

// Generic filter type
export type Filter = {
  field: string
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'in' | 'nin'
  value: any
}

// Generic sort type
export type Sort = {
  field: string
  order: SortOrder
}

// Search result type
export type SearchResult<T> = {
  items: T[]
  total: number
  facets?: Record<string, Array<{ value: string, count: number }>>
  suggestions?: string[]
}

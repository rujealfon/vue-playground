import { z } from 'zod'

// Common base schemas
export const idSchema = z.string().min(1)
export const emailSchema = z.string().email('Invalid email address')
export const urlSchema = z.string().url('Invalid URL')
export const phoneSchema = z.string().regex(/^\+?[\d\s\-()]+$/, 'Invalid phone number')

// Date schemas
export const dateStringSchema = z.string().datetime()
export const dateSchema = z.date()
export const dateRangeSchema = z.object({
  start: z.date(),
  end: z.date()
}).refine(data => data.start <= data.end, {
  message: 'Start date must be before or equal to end date',
  path: ['end']
})

// Pagination schemas
export const paginationParamsSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc')
})

export const paginationMetaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})

export function paginatedResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    data: z.array(dataSchema),
    meta: paginationMetaSchema
  })
}

// Search schemas
export const searchParamsSchema = z.object({
  query: z.string().min(1),
  filters: z.record(z.string(), z.any()).optional(),
  facets: z.array(z.string()).optional()
})

// File upload schemas
export const fileSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  url: z.string().url().optional(),
  uploadedAt: z.date().optional()
})

export const imageSchema = fileSchema.extend({
  width: z.number().optional(),
  height: z.number().optional(),
  alt: z.string().optional()
})

// Address schema
export const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),
  country: z.string().min(1),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional()
})

// Contact information schema
export const contactSchema = z.object({
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
  website: urlSchema.optional(),
  address: addressSchema.optional()
})

// API response schemas
export function successResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    success: z.literal(true),
    data: dataSchema,
    message: z.string().optional()
  })
}

export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.string(), z.any()).optional()
  })
})

// Notification schema
export const notificationSchema = z.object({
  id: idSchema,
  type: z.enum(['info', 'success', 'warning', 'error']),
  title: z.string(),
  message: z.string(),
  timestamp: dateSchema,
  isRead: z.boolean().default(false),
  actionUrl: urlSchema.optional(),
  expiresAt: dateSchema.optional()
})

// Settings schema
export const settingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  language: z.string().default('en'),
  timezone: z.string().default('UTC'),
  notifications: z.object({
    email: z.boolean().default(true),
    push: z.boolean().default(true),
    sms: z.boolean().default(false)
  }),
  privacy: z.object({
    profileVisible: z.boolean().default(true),
    analyticsEnabled: z.boolean().default(true)
  })
})

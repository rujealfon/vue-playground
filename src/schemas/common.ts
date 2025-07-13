import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10)
})

export const sortSchema = z.object({
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

export const searchSchema = z.object({
  search: z.string().optional()
})

export function apiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    data: dataSchema,
    message: z.string().optional(),
    success: z.boolean()
  })
}

export function paginatedResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    data: z.array(dataSchema),
    meta: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      totalPages: z.number()
    })
  })
}

export const errorResponseSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
  field: z.string().optional()
})

export const idParamSchema = z.object({
  id: z.string().uuid('Invalid ID format')
})

export type Pagination = z.infer<typeof paginationSchema>
export type Sort = z.infer<typeof sortSchema>
export type Search = z.infer<typeof searchSchema>
export type IdParam = z.infer<typeof idParamSchema>

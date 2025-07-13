import { z } from 'zod'

import { createEmailSchema, createIdSchema, createOptionalStringSchema, createRequiredStringSchema } from '@/lib/validation'

export const userRoleSchema = z.enum(['admin', 'user'])

export const userSchema = z.object({
  id: createIdSchema(),
  name: createRequiredStringSchema('Name', 2),
  email: createEmailSchema(),
  role: userRoleSchema,
  avatar: createOptionalStringSchema(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export const updateProfileSchema = z.object({
  name: createRequiredStringSchema('Name', 2),
  email: createEmailSchema(),
  avatar: createOptionalStringSchema()
})

export const createUserSchema = z.object({
  name: createRequiredStringSchema('Name', 2),
  email: createEmailSchema(),
  role: userRoleSchema.default('user')
})

export const userQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: createOptionalStringSchema(),
  role: userRoleSchema.optional(),
  sortBy: z.enum(['name', 'email', 'createdAt', 'updatedAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

export type User = z.infer<typeof userSchema>
export type UserRole = z.infer<typeof userRoleSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UserQuery = z.infer<typeof userQuerySchema>

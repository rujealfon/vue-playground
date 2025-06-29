import type { z } from 'zod'

import type { UserSchema } from '@/features/auth/schemas/auth.schema'
import type { UserRole as _UserRole } from '@/features/auth/types/auth.type'

// User type
export type User = z.infer<typeof UserSchema>

// Auth tokens type
export type AuthTokens = {
  accessToken: string
  refreshToken: string
}

// Login credentials type
export type LoginCredentials = {
  email: string
  password: string
}

// Register data type
export type RegisterData = {
  name: string
  email: string
  password: string
}

export type UserRole = _UserRole

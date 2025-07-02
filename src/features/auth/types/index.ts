import type { z } from 'zod'

import {
  authResponseSchema,
  changePasswordSchema,
  loginSchema,
  passwordResetRequestSchema,
  passwordResetSchema,
  registerSchema,
  updateProfileSchema,
  userSchema
} from '../schemas'

// Re-export schemas for backward compatibility
export {
  authResponseSchema,
  changePasswordSchema,
  loginSchema,
  passwordResetRequestSchema,
  passwordResetSchema,
  registerSchema,
  updateProfileSchema,
  userSchema
}

// Inferred types from schemas
export type LoginForm = z.infer<typeof loginSchema>
export type RegisterForm = z.infer<typeof registerSchema>
export type User = z.infer<typeof userSchema>
export type AuthResponse = z.infer<typeof authResponseSchema>
export type PasswordResetRequest = z.infer<typeof passwordResetRequestSchema>
export type PasswordReset = z.infer<typeof passwordResetSchema>
export type ChangePassword = z.infer<typeof changePasswordSchema>
export type UpdateProfile = z.infer<typeof updateProfileSchema>

// Auth state interface
export type AuthState = {
  user: User | null
  token: string | null
  refreshToken: string | null
  isLoading: boolean
  isAuthenticated: boolean
}

// API Error types
export type ApiError = {
  message: string
  statusCode: number
  errors?: Record<string, string[]>
}

// Auth events
export type AuthEvents = {
  login: AuthResponse
  logout: void
  register: AuthResponse
  tokenRefresh: string
  error: ApiError
}

// Permission types
export type Permission
  = | 'read:users'
    | 'write:users'
    | 'delete:users'
    | 'read:admin'
    | 'write:admin'

export type UserWithPermissions = {
  permissions: Permission[]
} & User

// Session types
export type Session = {
  id: string
  userId: string
  token: string
  refreshToken: string
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
  deviceInfo?: {
    userAgent: string
    ip: string
    location?: string
  }
}

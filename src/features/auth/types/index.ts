import type { AuthTokens, LoginCredentials, RegisterData, User } from '@/shared/types'

// Auth state types
export type AuthState = {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// Auth form types
export type LoginForm = LoginCredentials & {
  rememberMe?: boolean
}

export type RegisterForm = RegisterData & {
  termsAccepted: boolean
}

// Auth response types
export type LoginResponse = {
  user: User
  tokens: AuthTokens
}

export type RegisterResponse = {
  user: User
  tokens: AuthTokens
  message: string
}

// Password reset types
export type ForgotPasswordRequest = {
  email: string
}

export type ResetPasswordRequest = {
  token: string
  password: string
  confirmPassword: string
}

// Profile update types
export type UpdateProfileRequest = {
  name?: string
  email?: string
  avatar?: string
}

export type ChangePasswordRequest = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// Auth errors
export enum AuthErrorCode {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  WEAK_PASSWORD = 'WEAK_PASSWORD',
  TOO_MANY_ATTEMPTS = 'TOO_MANY_ATTEMPTS',
}

export type AuthError = {
  code: AuthErrorCode
  message: string
  field?: string
}

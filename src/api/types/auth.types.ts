import type { LoginFormData, RegisterFormData } from '@/schemas'

export type User = {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
  createdAt: string
  updatedAt: string
}

export type AuthTokens = {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export type LoginRequest = {} & LoginFormData

export type RegisterRequest = {} & RegisterFormData

export type LoginResponse = {
  user: User
  tokens: AuthTokens
}

export type RegisterResponse = {
  user: User
  tokens: AuthTokens
}

export type RefreshTokenRequest = {
  refreshToken: string
}

export type RefreshTokenResponse = {
  tokens: AuthTokens
}

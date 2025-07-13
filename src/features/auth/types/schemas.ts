import { z } from 'zod'

import { createEmailSchema, createPasswordSchema, createRequiredStringSchema } from '@/lib/validation'

export const loginSchema = z.object({
  email: createEmailSchema(),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false)
})

export const registerSchema = z.object({
  name: createRequiredStringSchema('Name', 2),
  email: createEmailSchema(),
  password: createPasswordSchema(),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmPassword']
})

export const forgotPasswordSchema = z.object({
  email: createEmailSchema()
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: createPasswordSchema(),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmPassword']
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: createPasswordSchema(),
  confirmNewPassword: z.string()
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmNewPassword']
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>

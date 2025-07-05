import { z } from 'zod'

// Validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmPassword']
})

// Utility functions
export function isValidEmail(email: string): boolean {
  return loginSchema.shape.email.safeParse(email).success
}

export function isValidPassword(password: string): boolean {
  return loginSchema.shape.password.safeParse(password).success
}

export function formatUserName(name: string): string {
  return name.trim().replace(/\s+/g, ' ')
}

export function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

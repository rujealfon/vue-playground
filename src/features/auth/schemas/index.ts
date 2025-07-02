import * as z from 'zod'

// Login Schema
export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' })
})
export type LoginSchema = z.infer<typeof loginSchema>

// Register Schema
export const registerSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' })
})
export type RegisterSchema = z.infer<typeof registerSchema>

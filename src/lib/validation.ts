import { z } from 'zod'

// Common validation helpers
export function createRequiredStringSchema(fieldName: string, minLength = 1) {
  return z.string({
    required_error: `${fieldName} is required`,
    invalid_type_error: `${fieldName} must be a string`
  }).min(minLength, `${fieldName} must be at least ${minLength} character(s)`)
}

export function createEmailSchema() {
  return z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
}

export function createPasswordSchema(minLength = 8) {
  return z.string()
    .min(minLength, `Password must be at least ${minLength} characters`)
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number')
}

export function createOptionalStringSchema() {
  return z.string().optional()
}

export function createIdSchema() {
  return z.string().uuid('Invalid ID format')
}

// Generic form validation helper
export function createFormSchema<T extends Record<string, any>>(schema: z.ZodSchema<T>) {
  return {
    schema,
    validate: (data: unknown) => schema.safeParse(data),
    validateField: (field: keyof T, value: unknown) => {
      // For simple field validation, we'll use the schema parse
      try {
        return { success: true, data: schema.parse({ [field]: value })[field] }
      }
      catch {
        return { success: false, error: { message: 'Validation failed' } }
      }
    }
  }
}

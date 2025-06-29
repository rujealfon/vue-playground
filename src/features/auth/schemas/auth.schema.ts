import { z } from 'zod'

import { UserRole } from '@/features/auth/types/auth.type'

// User schema for validation
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().url().optional(),
  role: z.nativeEnum(UserRole).optional(),
})

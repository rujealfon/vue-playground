import type { LoginSchema, RegisterSchema } from '@/features/auth/schemas'

import { api } from '@/lib/api'

export function loginWithEmailAndPassword(credentials: LoginSchema) {
  return api('/login', {
    method: 'POST',
    body: credentials
  })
}

export function registerWithEmailAndPassword(credentials: RegisterSchema) {
  return api('/register', {
    method: 'POST',
    body: credentials
  })
}

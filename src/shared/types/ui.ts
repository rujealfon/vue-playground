import type { UserRole } from '@/features/auth/types/auth.type'

// Table types
export type TableColumn = {
  key: string
  label: string
  sortable?: boolean
  width?: string
}

export type TableRow = Record<string, any>

export type TableData = {
  columns: TableColumn[]
  rows: TableRow[]
}

// Navigation types
export type NavItem = {
  label: string
  to: string
  icon?: string
  children?: NavItem[]
  requiresAuth?: boolean
  roles?: UserRole[]
}

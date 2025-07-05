import type { User } from '@/shared/types'

// User entity utilities
export function formatUserDisplayName(user: User): string {
  return user.name.trim() || user.email.split('@')[0]
}

export function getUserInitials(user: User): string {
  const name = formatUserDisplayName(user)
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

export function isUserActive(_user: User): boolean {
  // This would typically check some timestamp or status field
  // For now, we'll assume all users are active
  return true
}

export function sortUsersByName(users: User[]): User[] {
  return [...users].sort((a, b) => a.name.localeCompare(b.name))
}

export function filterActiveUsers(users: User[]): User[] {
  return users.filter(isUserActive)
}

export function createUserSearchMatcher(searchTerm: string) {
  const term = searchTerm.toLowerCase()
  return (user: User) => {
    return user.name.toLowerCase().includes(term)
      || user.email.toLowerCase().includes(term)
  }
}

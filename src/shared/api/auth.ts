import type { LoginCredentials, RegisterData, User } from '@/entities/user'

// Mock API responses - replace with real API calls
export type AuthResponse = {
  user: User
  token: string
}

export type ApiError = {
  message: string
  code?: string
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock users database
const mockUsers: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    password: 'password123'
  }
]

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(1000) // Simulate network delay

    const user = mockUsers.find(u => u.email === credentials.email)

    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid email or password')
    }

    const { password, ...userWithoutPassword } = user
    const token = `mock_token_${user.id}_${Date.now()}`

    return {
      user: userWithoutPassword,
      token
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    await delay(1000) // Simulate network delay

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === data.email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      throw new Error('Passwords do not match')
    }

    // Create new user
    const newUser: User & { password: string } = {
      id: String(mockUsers.length + 1),
      email: data.email,
      name: data.name,
      password: data.password
    }

    mockUsers.push(newUser)

    const { password, ...userWithoutPassword } = newUser
    const token = `mock_token_${newUser.id}_${Date.now()}`

    return {
      user: userWithoutPassword,
      token
    }
  },

  async validateToken(token: string): Promise<User> {
    await delay(500) // Simulate network delay

    // Mock token validation
    const tokenParts = token.split('_')
    if (tokenParts.length !== 3 || tokenParts[0] !== 'mock' || tokenParts[1] !== 'token') {
      throw new Error('Invalid token')
    }

    const userId = tokenParts[2]
    const user = mockUsers.find(u => u.id === userId)

    if (!user) {
      throw new Error('User not found')
    }

    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  },

  async logout(): Promise<void> {
    await delay(200) // Simulate network delay
    // In a real app, you might invalidate the token on the server
    return Promise.resolve()
  }
}

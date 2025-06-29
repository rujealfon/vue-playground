import { z } from 'zod'

import { api, apiUtils, useApi } from './api'

// Example Zod schemas for type safety
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().url().optional(),
})

const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
})

type User = z.infer<typeof UserSchema>
type Post = z.infer<typeof PostSchema>

// Example API service class
export class ApiService {
  private api = api
  private utils = apiUtils

  // Get all users with Zod validation
  async getUsers(): Promise<User[]> {
    const response = await this.utils.get<User[]>('/users')
    return z.array(UserSchema).parse(response)
  }

  // Get user by ID
  async getUser(id: number): Promise<User> {
    const response = await this.utils.get<User>(`/users/${id}`)
    return UserSchema.parse(response)
  }

  // Create new user
  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const response = await this.utils.post<User>('/users', userData)
    return UserSchema.parse(response)
  }

  // Update user
  async updateUser(id: number, userData: Partial<Omit<User, 'id'>>): Promise<User> {
    const response = await this.utils.patch<User>(`/users/${id}`, userData)
    return UserSchema.parse(response)
  }

  // Delete user
  async deleteUser(id: number): Promise<void> {
    await this.utils.delete(`/users/${id}`)
  }

  // Get posts with pagination
  async getPosts(page = 1, limit = 10): Promise<Post[]> {
    const response = await this.utils.get<Post[]>('/posts', {
      query: { _page: page, _limit: limit },
    })
    return z.array(PostSchema).parse(response)
  }

  // Upload file example
  async uploadFile(file: File): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append('file', file)

    return await this.api<{ url: string }>('/upload', {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header for FormData
      headers: {},
    })
  }
}

// Example Vue composable using the API
export function useUserApi() {
  const { setAuthToken, clearAuthToken, isAuthenticated } = useApi()
  const apiService = new ApiService()

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await api<{ token: string, user: User }>('/auth/login', {
        method: 'POST',
        body: { email, password },
      })

      // Set the auth token - this will be automatically included in future requests
      setAuthToken(response.token)

      return response.user
    }
    catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  // Logout function
  const logout = () => {
    clearAuthToken()
  }

  return {
    // Auth methods
    login,
    logout,
    isAuthenticated,

    // User methods
    getUsers: apiService.getUsers.bind(apiService),
    getUser: apiService.getUser.bind(apiService),
    createUser: apiService.createUser.bind(apiService),
    updateUser: apiService.updateUser.bind(apiService),
    deleteUser: apiService.deleteUser.bind(apiService),

    // Post methods
    getPosts: apiService.getPosts.bind(apiService),

    // File upload
    uploadFile: apiService.uploadFile.bind(apiService),
  }
}

// Example usage in a Vue component:
/*
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserApi } from '@/shared/services/api-examples'

const { getUsers, login, logout, isAuthenticated } = useUserApi()
const users = ref([])
const loading = ref(false)

// Load users on component mount
onMounted(async () => {
  if (isAuthenticated()) {
    loading.value = true
    try {
      users.value = await getUsers()
    } catch (error) {
      console.error('Failed to load users:', error)
    } finally {
      loading.value = false
    }
  }
})

// Login handler
const handleLogin = async (email: string, password: string) => {
  try {
    const user = await login(email, password)
    console.log('Logged in user:', user)
    // Reload users after login
    users.value = await getUsers()
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>
*/

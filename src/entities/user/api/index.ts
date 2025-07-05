import type { User } from '@/shared/types'

import { ApiClient } from '@/shared/api'
import { APP_CONFIG } from '@/shared/config'

export class UserEntityApi {
  private apiClient: ApiClient

  constructor() {
    this.apiClient = new ApiClient(APP_CONFIG.api.baseUrl)
  }

  async getUsers(): Promise<User[]> {
    const response = await this.apiClient.get<User[]>('/users')
    return response.data
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const response = await this.apiClient.get<User>(`/users/${id}`)
      return response.data
    }
    catch {
      return null
    }
  }

  async searchUsers(searchTerm: string): Promise<User[]> {
    // For now, use a simple URL with query parameter
    const response = await this.apiClient.get<User[]>(`/users/search?q=${encodeURIComponent(searchTerm)}`)
    return response.data
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const response = await this.apiClient.post<User>('/users', userData)
    return response.data
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await this.apiClient.put<User>(`/users/${id}`, userData)
    return response.data
  }

  async deleteUser(id: string): Promise<void> {
    await this.apiClient.delete(`/users/${id}`)
  }

  async getUsersByRole(role: string): Promise<User[]> {
    const response = await this.apiClient.get<User[]>(`/users?role=${encodeURIComponent(role)}`)
    return response.data
  }

  async getUserStats(): Promise<{ total: number, active: number, inactive: number }> {
    const response = await this.apiClient.get<{ total: number, active: number, inactive: number }>('/users/stats')
    return response.data
  }
}

// Export a singleton instance
export const userEntityApi = new UserEntityApi()

// Export types for external use
export type CreateUserData = Omit<User, 'id'>
export type UpdateUserData = Partial<User>
export type UserStats = { total: number, active: number, inactive: number }

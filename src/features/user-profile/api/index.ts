import type { ApiResponse, User } from '@/shared/types'

import { ApiClient } from '@/shared/api'
import { APP_CONFIG } from '@/shared/config'

export type UpdateProfileData = {
  name?: string
  email?: string
  avatar?: string
}

export type ChangePasswordData = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

class UserProfileApi {
  private client: ApiClient

  constructor() {
    this.client = new ApiClient(APP_CONFIG.api.baseUrl)
  }

  async updateProfile(data: UpdateProfileData): Promise<ApiResponse<User>> {
    return this.client.put<User>('/user/profile', data)
  }

  async changePassword(data: ChangePasswordData): Promise<ApiResponse<void>> {
    return this.client.put<void>('/user/password', data)
  }

  async uploadAvatar(file: File): Promise<ApiResponse<{ avatar: string }>> {
    const formData = new FormData()
    formData.append('avatar', file)

    return this.client.request<{ avatar: string }>('/user/avatar', {
      method: 'POST',
      body: formData,
      headers: {} // Let browser set Content-Type for FormData
    })
  }

  async deleteAccount(): Promise<ApiResponse<void>> {
    return this.client.delete<void>('/user/account')
  }
}

export const userProfileApi = new UserProfileApi()

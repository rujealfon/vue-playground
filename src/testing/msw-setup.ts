import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { createMockActivity, createMockDashboardStats, createMockUser } from './test-utils'

// Mock API handlers
export const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', () => {
    return HttpResponse.json({
      data: {
        user: createMockUser(),
        token: 'mock-token',
        refreshToken: 'mock-refresh-token'
      },
      success: true
    })
  }),

  http.post('/api/auth/register', () => {
    return HttpResponse.json({
      data: {
        user: createMockUser(),
        token: 'mock-token',
        refreshToken: 'mock-refresh-token'
      },
      success: true
    })
  }),

  http.get('/api/auth/me', () => {
    return HttpResponse.json({
      data: createMockUser(),
      success: true
    })
  }),

  http.post('/api/auth/logout', () => {
    return HttpResponse.json({
      data: null,
      success: true
    })
  }),

  // Dashboard endpoints
  http.get('/api/dashboard/stats', () => {
    return HttpResponse.json({
      data: createMockDashboardStats(),
      success: true
    })
  }),

  http.get('/api/dashboard/activities', () => {
    return HttpResponse.json({
      data: {
        data: [
          createMockActivity({ id: '1', description: 'User logged in' }),
          createMockActivity({ id: '2', type: 'update', description: 'Profile updated' }),
          createMockActivity({ id: '3', type: 'create', description: 'New post created' })
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 3,
          totalPages: 1
        }
      },
      success: true
    })
  })
]

// Setup MSW server
export const server = setupServer(...handlers)

import type { MountingOptions } from '@vue/test-utils'
import type { Component } from 'vue'

import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

// Mock router for testing
function createMockRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' } },
      { path: '/dashboard', component: { template: '<div>Dashboard</div>' } },
      { path: '/auth/login', component: { template: '<div>Login</div>' } }
    ]
  })
}

// Enhanced render function with global plugins
export function render(component: Component, options: MountingOptions<any> = {}) {
  const pinia = createPinia()
  const router = createMockRouter()

  return mount(component, {
    global: {
      plugins: [pinia, router],
      ...options.global
    },
    ...options
  })
}

// Common test data factories
export function createMockUser(overrides = {}) {
  return {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user' as const,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    ...overrides
  }
}

export function createMockActivity(overrides = {}) {
  return {
    id: '1',
    type: 'login' as const,
    description: 'User logged in',
    userId: '1',
    createdAt: '2023-01-01T00:00:00Z',
    ...overrides
  }
}

export function createMockDashboardStats(overrides = {}) {
  return {
    totalUsers: 100,
    activeUsers: 80,
    totalRevenue: 50000,
    growth: 12.5,
    ...overrides
  }
}

// Helper to wait for async operations
export function waitFor(condition: () => boolean, timeout = 5000) {
  return new Promise<void>((resolve, reject) => {
    const startTime = Date.now()

    const check = () => {
      if (condition()) {
        resolve()
      }
      else if (Date.now() - startTime > timeout) {
        reject(new Error('Timeout waiting for condition'))
      }
      else {
        setTimeout(check, 100)
      }
    }

    check()
  })
}

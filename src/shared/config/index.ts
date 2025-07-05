// Application configuration
export const APP_CONFIG = {
  name: 'Vue Playground',
  version: '1.0.0',
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000
  },
  theme: {
    default: 'light' as const,
    storage: 'theme-preference'
  },
  pagination: {
    defaultLimit: 10,
    maxLimit: 100
  }
} as const

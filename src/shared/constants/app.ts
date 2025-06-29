// Application configuration
export const APP_CONFIG = {
  NAME: 'Vue Playground',
  DESCRIPTION: 'A modern Vue 3 application with TypeScript, Pinia, and Tailwind CSS',
  VERSION: '1.0.0',
  AUTHOR: 'Vue Playground Team',
  REPOSITORY: 'https://github.com/example/vue-playground',
} as const

// Environment configuration
export const ENV_CONFIG = {
  DEVELOPMENT: import.meta.env.DEV,
  PRODUCTION: import.meta.env.PROD,
  BASE_URL: import.meta.env.BASE_URL,
} as const

// Feature flags
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: false,
  ENABLE_ERROR_REPORTING: true,
  ENABLE_PERFORMANCE_MONITORING: false,
  ENABLE_BETA_FEATURES: import.meta.env.DEV,
} as const

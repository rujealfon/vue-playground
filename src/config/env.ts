export const env = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Vue Playground',
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD
} as const

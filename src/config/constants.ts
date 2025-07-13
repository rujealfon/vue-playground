export const APP_CONFIG = {
  APP_NAME: 'Vue Playground',
  APP_DESCRIPTION: 'A modern Vue.js application following bulletproof-react patterns',
  GITHUB_URL: 'https://github.com/alan2207/bulletproof-react'
} as const

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh'
  },
  USERS: {
    LIST: '/users',
    PROFILE: '/users/profile'
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    ACTIVITIES: '/dashboard/activities'
  }
} as const

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile'
} as const

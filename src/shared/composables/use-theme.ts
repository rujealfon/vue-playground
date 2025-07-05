import { ref, watch } from 'vue'

import type { Theme } from '../types'

import { APP_CONFIG } from '../config'

export function useTheme() {
  const theme = ref<Theme>(
    (localStorage.getItem(APP_CONFIG.theme.storage) as Theme)
    || APP_CONFIG.theme.default
  )

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    localStorage.setItem(APP_CONFIG.theme.storage, newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  // Apply theme on mount
  watch(
    theme,
    (newTheme) => {
      document.documentElement.setAttribute('data-theme', newTheme)
    },
    { immediate: true }
  )

  return {
    theme,
    setTheme,
    toggleTheme
  }
}

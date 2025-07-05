import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type NavigationItem = {
  label: string
  to: string
  icon?: string
  requiresAuth?: boolean
  hideWhenAuth?: boolean
}

export const useNavigationStore = defineStore('navigation', () => {
  // State
  const isMobileMenuOpen = ref(false)

  const navigationItems = ref<NavigationItem[]>([
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Login', to: '/login', hideWhenAuth: true },
    { label: 'Register', to: '/register', hideWhenAuth: true }
  ])

  // Getters
  const visibleNavItems = computed(() => {
    return (isAuthenticated: boolean) => {
      return navigationItems.value.filter((item) => {
        if (item.requiresAuth && !isAuthenticated)
          return false
        if (item.hideWhenAuth && isAuthenticated)
          return false
        return true
      })
    }
  })

  // Actions
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
  }

  const addNavigationItem = (item: NavigationItem) => {
    navigationItems.value.push(item)
  }

  const removeNavigationItem = (label: string) => {
    const index = navigationItems.value.findIndex(item => item.label === label)
    if (index > -1) {
      navigationItems.value.splice(index, 1)
    }
  }

  return {
    isMobileMenuOpen,
    navigationItems,
    visibleNavItems,
    toggleMobileMenu,
    closeMobileMenu,
    addNavigationItem,
    removeNavigationItem
  }
})

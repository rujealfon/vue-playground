import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from '@/app.vue'
import router from '@/core/router'
import { useAuthStore } from '@/features/auth/stores/auth.store'
import '@/assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize auth store after pinia is mounted
const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')

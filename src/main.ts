import { createApp } from 'vue'

import { initializeAuth, pinia, router } from '@/app'
import App from '@/app.vue'
import '@/app/styles/main.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

// Initialize authentication after app setup
router.isReady().then(() => {
  initializeAuth()
})

app.mount('#app')

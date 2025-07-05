import { createApp } from 'vue'

import App from '@/app.vue'

import { router, store } from './providers'
import './styles/main.css'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')

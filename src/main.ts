import { VueQueryPlugin } from '@tanstack/vue-query'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './app/app.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

app.use(pinia)
app.use(router)
app.use(VueQueryPlugin)
app.use(head)

app.mount('#app')

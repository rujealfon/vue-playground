import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: 'src/components/pages'
    }),
    vue(),
    tailwindcss(),
    vueDevTools({
      launchEditor: 'cursor'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@atoms': fileURLToPath(new URL('./src/components/atomic/atoms', import.meta.url)),
      '@molecules': fileURLToPath(new URL('./src/components/atomic/molecules', import.meta.url)),
      '@organisms': fileURLToPath(new URL('./src/components/atomic/organisms', import.meta.url))
    }
  }
})

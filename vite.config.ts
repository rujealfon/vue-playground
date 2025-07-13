import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    vue(),
    tailwindcss(),
    vueDevTools({
      launchEditor: 'cursor'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@/components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@/lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@/config': fileURLToPath(new URL('./src/config', import.meta.url)),
      '@/schemas': fileURLToPath(new URL('./src/schemas', import.meta.url)),
      '@/types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@/utils': fileURLToPath(new URL('./src/utils', import.meta.url))
    }
  }
})

/*
Path: vite.config.ts
*/

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', 
  server: {
    proxy: {
      '/datamaq_php/backend/api/v1/': {
        target: 'http://127.0.0.1:5000', 
        changeOrigin: true,
      }
    }
  }
})

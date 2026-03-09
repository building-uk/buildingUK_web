import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@atoms': '/src/components/atoms',
      '@molecules': '/src/components/molecules',
      '@organisms': '/src/components/organisms',
      '@templates': '/src/components/templates',
      '@pages': '/src/pages',
      '@data': '/src/data',
      '@repositories': '/src/repositories',
      '@styles': '/src/styles',
      '@assets': '/src/assets'
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/PBI/',
  plugins: [react()],
  server: {
    proxy: {
      '/PBI': 'http://localhost:18080', // Proxy requests to backend
    },
} }
)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  },
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, './src'),
      "@/components": path.resolve(__dirname, './src/components'),
      "@/compossables": path.resolve(__dirname, './src/compossables'),
      "@/api": path.resolve(__dirname, './src/api'),
      "@/config": path.resolve(__dirname, './src/config'),
      "@/hooks": path.resolve(__dirname, './src/hooks'),
      "@/pages": path.resolve(__dirname, './src/pages'),
      "@/types": path.resolve(__dirname, './src/types'),
    }
  },
})

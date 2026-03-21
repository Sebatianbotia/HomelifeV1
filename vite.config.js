import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/wp-json': {
        target: 'https://www.homelife.com.co',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
      },
    },
  },
})

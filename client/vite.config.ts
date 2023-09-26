import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/npm install vite@latest --save-dev
export default defineConfig({
  plugins: [react()],
})

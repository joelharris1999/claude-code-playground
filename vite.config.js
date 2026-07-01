import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://joelharris1999.github.io/claude-code-playground/
export default defineConfig({
  base: '/claude-code-playground/',
  plugins: [react()],
})

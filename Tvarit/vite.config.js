import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/NagarSamadhan/',
  plugins: [react()], // (or whatever plugins are here)
})
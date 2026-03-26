import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // If you are deploying to a root domain, you don't usually need a base
  // but ensure there isn't a weird base path here.
})
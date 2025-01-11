import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Automatically open the browser after starting the dev server
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        login: 'public/login.html',      // Add login.html as an entry point
        dashboard: 'public/dashboard.html', // Add dashboard.html as an entry point
      }
    }
  }
});

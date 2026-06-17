import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.jsx'], // Ensure this matches your actual file structure
      refresh: true,
    }),
    react(),
    tailwindcss(),
  ],
  // REMOVE the entire 'build' block that points to index.html
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      host: '10.166.20.85',
      port: 5173,
    },
    watch: {
      usePolling: true,
    },
  },
  define: {
    __BUNDLED_DEV__: JSON.stringify(true),
    __SERVER_FORWARD_CONSOLE__: JSON.stringify(false),
    __NODE__: JSON.stringify(false),
  },
})
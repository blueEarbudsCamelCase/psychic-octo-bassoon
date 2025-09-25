import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      // Proxy requests from /neal-proxy to the neal.fun domain
      '/neal-proxy': {
        target: 'https://embed.neal.fun',
        changeOrigin: true,
        secure: true,
        // Rewrite the URL path to remove the /neal-proxy prefix
        rewrite: (path) => path.replace(/^\/neal-proxy/, ''),
      },
    },
  },
});

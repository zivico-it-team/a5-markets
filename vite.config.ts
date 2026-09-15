import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    host: true,
    proxy: {
      '/api/yahoo-chart': {
        target: 'https://query1.finance.yahoo.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/yahoo-chart/, '/v8/finance/chart'),
      },
      '/api/a5-market': {
        target: 'https://server2.a5markets.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/a5-market/, '/api'),
      },
    },
  }
});

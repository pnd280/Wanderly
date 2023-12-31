import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@layouts': '/src/layouts',
      '@styles': '/src/styles',
      '@assets': '/src/assets',
      '@context': '/src/context',
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      cache: false,
    }),
  ],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@components': './src/components',
      '@layouts': './src/layouts',
      '@hooks': './src/hooks',
    },
  },
});

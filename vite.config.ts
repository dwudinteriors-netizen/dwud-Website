import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/dwud-Website/',
  plugins: [react()],
  server: {
    port: 5173,
  },
});

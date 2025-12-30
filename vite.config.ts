
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // base: './' garante que o deploy funcione em qualquer subpasta do GitHub Pages
  base: './',
  plugins: [react()],
  define: {
    // Injeta a API_KEY durante o tempo de build. 
    // No GitHub Actions, você deve configurar este segredo.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  server: {
    port: 3000,
    host: true
  },
});

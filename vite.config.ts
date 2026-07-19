import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // SECURITY NOTE: the Gemini API key is deliberately NOT `define`d here.
  // It must never reach the client bundle — all AI calls go through /api/chat,
  // where the key lives server-side only.
  return {
    plugins: [react(), tailwindcss()],
    build: {
      target: 'es2020',
      chunkSizeWarningLimit: 700,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

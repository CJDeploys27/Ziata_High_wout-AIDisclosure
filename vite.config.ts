import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // <--- ADD THIS LINE! This is the magic fix.
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});

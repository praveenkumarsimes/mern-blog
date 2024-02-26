import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://gorgeous-yak-leg-warmers.cyclic.app/',
        secure: false,
      },
    },
  },
  plugins: [react()],
});

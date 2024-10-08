// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })



import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://185.209.230.208:8083', // API server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/preorder'),
      },
    },
  },
});

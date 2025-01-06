import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  base: '/',  // Keep base as '/' unless deploying to a subdirectory
  plugins: [
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,  // Development port
  },
  build: {
    outDir: 'dist',  // Ensure the build goes to `dist`
    rollupOptions: {
      input: './src/main.jsx',  // Ensure the entry point is correct
    },
  },
});

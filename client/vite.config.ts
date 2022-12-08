import { defineConfig } from 'vite';
import path from 'path';
import solidPlugin from 'vite-plugin-solid';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    solidPlugin(),
    {
      // default settings on build (i.e. fail on error)
      ...eslint(),
      apply: 'build',
    },
    {
      // do not fail on serve (i.e. local development)
      ...eslint({
        failOnWarning: false,
        failOnError: false,
      }),
      apply: 'serve',
      enforce: 'post',
    },
  ],
  server: {
    port: 3000,
    proxy: {
      '/v1': {
        target: 'http://localhost:7777',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@views': path.resolve(__dirname, './src/views'),
    },
  },
});

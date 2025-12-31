// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://casimir.engineering',
  // base: '/casimir.engineering/', // Uncomment if using github.io URL without custom domain
  output: 'static',
  build: {
    format: 'directory',
    assets: 'assets'
  },
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true,
      minify: true
    }
  }
});

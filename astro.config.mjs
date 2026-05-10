import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://xn--7xa.monster',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});

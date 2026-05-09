import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://xn--n5h.monster',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});

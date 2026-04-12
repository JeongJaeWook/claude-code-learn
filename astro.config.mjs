import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  integrations: [react()],
  site: 'https://JeongJaeWook.github.io',
  base: '/claude-code-learn',
});

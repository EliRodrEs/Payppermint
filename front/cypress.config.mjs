import { defineConfig } from 'cypress';
import viteDevServer from '@cypress/vite-dev-server';

const { startDevServer } = viteDevServer;

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('dev-server:start', async (options) => {
        return startDevServer({
          options,
          viteConfig: {
          },
        });
      });
    },
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
});

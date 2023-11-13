import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals:true,
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts']
  }
});

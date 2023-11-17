import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100
    },
    globals:true,
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts']
  }
});

import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  page: async ({ baseURL, page }, use) => {
    const messages: string[] = [];
    page.on('console', (msg) => {
      // Ignore regular log messages; we are only interested in errors.
      if (msg.type() === 'error') {
        messages.push(`[${msg.type()}] ${msg.text()}`);
      }
    });
    // Uncaught (in promise) TypeError + friends are page errors.
    page.on('pageerror', (error) => {
      messages.push(`[${error.name}] ${error.message}`);
    });
    await use(page);
    expect(messages).toStrictEqual([]);
  },
});

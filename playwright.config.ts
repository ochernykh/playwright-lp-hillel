import { defineConfig } from '@playwright/test';
import { testConfig } from './testConfig';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  use: {
    baseURL: testConfig.baseUrl,
    httpCredentials: testConfig.httpCredentials,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [['list'], ['html']],
  outputDir: 'test-results/',
  testMatch: '**/*.spec.ts',
});

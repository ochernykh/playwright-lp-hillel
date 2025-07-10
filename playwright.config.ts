import { defineConfig, devices } from '@playwright/test';
import { testConfig } from './testConfig';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  reporter: [['list'], ['html']],
  outputDir: 'test-results/',
  testMatch: '**/*.spec.ts',

  // Додано налаштування для кількох браузерів
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: testConfig.baseUrl,
        httpCredentials: testConfig.httpCredentials,
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: testConfig.baseUrl,
        httpCredentials: testConfig.httpCredentials,
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        baseURL: testConfig.baseUrl,
        httpCredentials: testConfig.httpCredentials,
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
    },
  ],
});

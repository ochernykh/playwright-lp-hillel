import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  retries: 0,
  use: {
    baseURL: "https://qauto.forstudy.space/",
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    httpCredentials: {
      username: "guest",
      password: "welcome2qauto",
    },
  },
  reporter: [["list"], ["html"]],
  outputDir: "test-results/",
  testMatch: "**/*.spec.ts",
});

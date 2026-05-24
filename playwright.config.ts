import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './src/tests',
  testMatch: '**/*.spec.ts',
  globalSetup: './src/utils/global-setup.ts',
  globalTeardown: './src/utils/global-teardown.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? '50%' : undefined,
  timeout: 60_000,

  expect: {
    timeout: parseInt(process.env.EXPECT_TIMEOUT || ''),
  },

  reporter: [
    ['html', { open: 'always' }],
    ['allure-playwright'],
    ['list'],
  ],

  use: {
    baseURL: process.env.BASE_URL || '',
    viewport: { width: 1920, height: 1080 },
    actionTimeout: parseInt(process.env.ACTION_TIMEOUT || ''),
    navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || ''),
    trace: process.env.CI ? 'on-first-retry' : 'off',
    screenshot: process.env.CI ? 'only-on-failure' : 'on',
    video: 'off',
    headless: process.env.HEADED !== 'true',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

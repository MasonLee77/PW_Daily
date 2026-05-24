import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  // Add any global cleanup logic here if needed
  console.log('Test run completed');
}

export default globalTeardown;
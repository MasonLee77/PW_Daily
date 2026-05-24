import { test, expect } from '@playwright/test';
import { ENV } from '../../utils/env.config';

test('Register Page', async ({ page }) => {
  await page.goto(ENV.BASE_URL);
  await page.getByRole('link', { name: /Register Page/ }).click();

  const username = ENV.TEST_USER_NAME;
  const email = ENV.TEST_USER_EMAIL;
  await page.waitForTimeout(ENV.SLOW_MO);
  await page.getByLabel('Username').fill(username);``
  await page.waitForTimeout(ENV.SLOW_MO);

  await page.getByLabel('Email').fill(email);
  await page.waitForTimeout(ENV.SLOW_MO);

  await page.getByRole('button', { name: 'Register' }).click();
  await page.waitForTimeout(ENV.SLOW_MO);

  await expect(page.locator('//tbody//tr')).toHaveCount(1);
  await page.waitForTimeout(ENV.SLOW_MO);
  await expect(page.locator('//tbody//td').nth(1)).toHaveText(username);
  await expect(page.locator('//tbody//td').nth(2)).toHaveText(email);
});
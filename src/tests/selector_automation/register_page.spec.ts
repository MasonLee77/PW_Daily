// Playwright
/* 
Viết code automation cho test case sau:
- Đi tới trang: https://material.playwrightvn.com/
- Click vào: Bài học 1: Register Page (có đủ các element)
- Điền vào username, email. Click button register.
- Kiểm tra kết quả có chứa username và email tương ứng
*/

import { test, expect } from '@playwright/test';
import { ENV } from '../../utils/env.config';

test('Register Page_1', async ({ page }) => {
  await page.goto(ENV.BASE_URL);
  await page.getByRole('link', { name: /Register Page/ }).click();

  const username = ENV.TEST_USER_NAME;
  const email = ENV.TEST_USER_EMAIL;
  await page.waitForTimeout(ENV.SLOW_MO);
  await page.getByLabel('Username').fill(username);
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

/* 
Viết code automation cho test case sau:
- Đi tới trang: https://material.playwrightvn.com/
- Click vào: Bài học 1: Register Page (có đủ các element)
- Điền vào đầy đủ các thông tin của user
- Kiểm tra kết quả đúng như thông tin đã điền.
*/

test('Register Page_2', async ({ page }) => {
  await page.goto(ENV.BASE_URL);
  await page.getByRole('link', { name: /Register Page/ }).click();

  const username = ENV.TEST_USER_NAME;
  const email = ENV.TEST_USER_EMAIL;

  await page.getByLabel('Username').fill(username);
  await page.waitForTimeout(ENV.SLOW_MO);

  await page.getByLabel('Email').fill(email);
  await page.waitForTimeout(ENV.SLOW_MO);

  await page.getByRole('radio', { name: 'Male', exact: true }).click();
  await page.waitForTimeout(ENV.SLOW_MO);

  await page.getByRole('checkbox', { name: 'Traveling' }).click();
  await page.waitForTimeout(ENV.SLOW_MO);

  await page.locator('option:has-text("Music")').click();
  await page.waitForTimeout(ENV.SLOW_MO);

  await page.getByRole('combobox', { name: 'Country:' }).selectOption('Canada');
  await page.waitForTimeout(ENV.SLOW_MO);

  await page.getByLabel('Date of Birth:').fill('1990-01-01');
  await page.waitForTimeout(ENV.SLOW_MO);

  await page.getByLabel('Biography:').fill('GenZ no^i? loan.');
  await page.waitForTimeout(ENV.SLOW_MO);

  await page.getByRole('button', { name: 'Register' }).click();
  await page.waitForTimeout(ENV.SLOW_MO);

  await expect(page.locator("//tbody//tr")).toHaveCount(1);
  await page.waitForTimeout(ENV.SLOW_MO);
  await expect(page.locator('tr').locator('td').nth(1)).toHaveText(username);
  await expect(page.locator('tr').locator('td').nth(2)).toHaveText(email);
  await expect(page.locator('tr').locator('td').nth(3)).toContainText('Gender: male');
  await expect(page.locator('tr').locator('td').nth(3)).toContainText('Hobbies: traveling');
  await expect(page.locator('tr').locator('td').nth(3)).toContainText('Country: canada');
  await expect(page.locator('tr').locator('td').nth(3)).toContainText('Date of Birth: 1990-01-01');
  await expect(page.locator('tr').locator('td').nth(3)).toContainText('Biography: GenZ no^i? loan.');
});
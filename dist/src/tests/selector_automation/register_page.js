"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const env_config_js_1 = require("../env.config.js");
(0, test_1.test)('Register Page', async ({ page }) => {
    await page.goto(env_config_js_1.ENV.BASE_URL);
    await page.getByRole('link', { name: /Register Page/ }).click();
    const username = env_config_js_1.ENV.TEST_USER_NAME;
    const email = env_config_js_1.ENV.TEST_USER_EMAIL;
    await page.getByLabel('Username').fill(username);
    await page.getByLabel('Email').fill(email);
    await page.getByRole('button', { name: 'Register' }).click();
    await (0, test_1.expect)(page.locator('//tbody//tr')).toHaveCount(1);
    await (0, test_1.expect)(page.locator('//tbody//td').nth(1)).toHaveText(username);
    await (0, test_1.expect)(page.locator('//tbody//td').nth(2)).toHaveText(email);
});
//# sourceMappingURL=register_page.js.map
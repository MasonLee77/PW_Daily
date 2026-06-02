// Playwright
/* 
Viết code automation cho test case sau:
- Đi tới trang: https://material.playwrightvn.com/
- Click vào: Bài học 2: Product page
- Thêm vào giỏ hàng 2 sản phẩm 1.
- Thêm vào giỏ hàng 2 sản phẩm 2.
- Thêm vào giỏ hàng 3 sản phẩm 3.
- Kiểm số lượng sản phẩm đúng.
(Nâng cao) Kiểm tra tổng tiền sản phẩm đúng (tổng tiền = tổng (số lượng * đơn giá))
*/

import { test, expect } from '@playwright/test';
import { ENV } from '../../utils/env.config';

test('#1_Product Page', async ({ page }) => {
    await page.goto(ENV.BASE_URL);
    await page.getByRole('link', { name: 'Bài học 2: Product page' }).click();

    // Helper to add product to cart multiple times and wait for cart visibility
    const addToCart = async (productId: number, times: number) => {
        const btn = page.locator(`.add-to-cart[data-product-id='${productId}']`);
        for (let i = 0; i < times; i++) {
            await btn.click();
            await expect(page.locator('#cart-items')).toBeVisible();
        }
    };

    await addToCart(1, 1);
    await addToCart(2, 1);
    await addToCart(3, 3);

    const rows = page.locator('#cart-items tr');
    await expect(rows).toHaveCount(3);

    // Validate each row: price, quantity and total
    const count = await rows.count();
    let totalExpect = 0;
    for (let i = 0; i < count; i++) {
        const row = rows.nth(i);
        const priceText = (await row.locator('td').nth(1).textContent()) || '';
        const qtyText = (await row.locator('td').nth(2).textContent()) || '0';
        const totalText = (await row.locator('td').nth(3).textContent()) || '';

        const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
        const qty = parseInt(qtyText.trim(), 10) || 0;
        const expected = price * qty;
        totalExpect += expected;

        expect(totalText.trim()).toBe(`$${expected.toFixed(2)}`);
        console.log(`Product ${i + 1} total price is correct`);
    }

    const total_price_actual = await page.locator('td.total-price').textContent();
    await expect(total_price_actual?.trim()).toBe(`$${totalExpect.toFixed(2)}`);
    console.log('Cart total price is correct');

});

test('#2_Product Page', async ({ page }) => {
    await page.goto(ENV.BASE_URL);
    await page.getByRole('link', { name: 'Bài học 2: Product page' }).click();


    await page.locator(".add-to-cart[data-product-id='1']").click();
    await page.waitForTimeout(ENV.SLOW_MO);

    await page.locator(".add-to-cart[data-product-id='2']").click();
    await page.waitForTimeout(ENV.SLOW_MO);

    await page.locator(".add-to-cart[data-product-id='3']").click();
    await page.waitForTimeout(ENV.SLOW_MO);

    await page.locator(".add-to-cart[data-product-id='3']").click();
    await page.waitForTimeout(ENV.SLOW_MO);

    await expect(page.locator('#cart-items').locator('tr')).toHaveCount(3);
    await page.waitForTimeout(ENV.SLOW_MO);

    await expect(page.locator("//tbody/tr[1]/td[3]")).toHaveText('1').then(() => console.log('Product 1 quantity is correct'));
    await expect(page.locator("//tbody/tr[2]/td[3]")).toHaveText('1').then(() => console.log('Product 2 quantity is correct'));
    await expect(page.locator("//tbody/tr[3]/td[3]")).toHaveText('2').then(() => console.log('Product 3 quantity is correct'));

    const price1 = await page.locator("//tbody/tr[1]/td[2]").textContent().catch(() => console.log('Could not retrieve price for product 1'));
    const price2 = await page.locator("//tbody/tr[2]/td[2]").textContent().catch(() => console.log('Could not retrieve price for product 2'));
    const price3 = await page.locator("//tbody/tr[3]/td[2]").textContent().catch(() => console.log('Could not retrieve price for product 3'));

    const quantity1 = await page.locator("//tbody/tr[1]/td[3]").textContent();
    const quantity2 = await page.locator("//tbody/tr[2]/td[3]").textContent();
    const quantity3 = await page.locator("//tbody/tr[3]/td[3]").textContent();
    
    const total1_expect = parseFloat(price1?.slice(1) || '0') * parseFloat(quantity1 || '0');
    const total2_expect = parseFloat(price2?.slice(1) || '0') * parseFloat(quantity2 || '0');
    const total3_expect = parseFloat(price3?.slice(1) || '0') * parseFloat(quantity3 || '0');
    
    const total1_actual = await page.locator("//tbody/tr[1]/td[4]").textContent();
    total1_actual && expect(total1_actual.trim()).toBe(`$${total1_expect.toFixed(2)}`);
    console.log('Product 1 total price is correct');

    const total2_actual = await page.locator("//tbody/tr[2]/td[4]").textContent();
    total2_actual && expect(total2_actual.trim()).toBe(`$${total2_expect.toFixed(2)}`);
    console.log('Product 2 total price is correct');

    const total3_actual = await page.locator("//tbody/tr[3]/td[4]").textContent();
    total3_actual && expect(total3_actual.trim()).toBe(`$${total3_expect.toFixed(2)}`);
    console.log('Product 3 total price is correct');

    const total_price_actual = await page.locator('td.total-price').textContent();
    const total_price_expect = total1_expect + total2_expect + total3_expect;
    total_price_actual && expect(total_price_actual.trim()).toBe(`$${total_price_expect.toFixed(2)}`);
    console.log('Cart total price is correct');

});
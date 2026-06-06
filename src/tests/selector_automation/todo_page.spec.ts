// Playwright
/* 
Viết code automation cho test case sau:
- Đi tới trang: https://material.playwrightvn.com/
- Click vào: Bài học 3: Todo page
- Thêm vào todo có nội dung: Xin chào, đây là bài thực hành ngày 18 tháng 9
- Verify chỉ có 1 Todo duy nhất được add vào.
- Sửa nội dung Todo: Xin chào, đây là bài thực hành ngày 18 tháng 9 - phiên bản đã chỉnh sửa
- Verify nội dung đã được chỉnh sửa
- Xoá Todo
- Verify Todo đã được xoá.
*/

import { test, expect } from '@playwright/test';
import { ENV } from '../../utils/env.config';

test('Todo Page', async ({ page }) => {
    await page.goto(ENV.BASE_URL);
    await page.getByRole('link', { name: 'Bài học 3: Todo page' }).click();

    const todoInput = page.getByPlaceholder('Enter a new task');
    const todoText = 'Xin chào, đây là bài thực hành ngày 18 tháng 9';
    await todoInput.fill(todoText);
    await page.getByRole('button', { name: 'Add Task' }).click();
    const todoItems = page.locator("//ul[@id='task-list']//li");
    await expect(todoItems.locator('span').first()).toHaveText(todoText);
    console.log('Todo item text is correct');
    await expect(todoItems).toHaveCount(1);
    console.log('Todo count is correct');

    const editedText = `${todoText} - phiên bản đã chỉnh sửa`;

    const editInput = todoItems.locator('button').filter({ hasText: 'Edit' }).first();
    await editInput.click();
    page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt');
        expect(dialog.message()).toContain('Edit Task');
        await dialog.accept(editedText);
    });
    await page.keyboard.press('Enter');
    await expect(todoItems.locator('span').first()).toHaveText(editedText);
    console.log('Todo edited text verified successfully');

    await todoItems.locator('button').filter({ hasText: 'Delete' }).first().click();
    page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toContain('Are you sure you want to delete this task?');
        await dialog.accept();
    });
    await page.keyboard.press('Enter');
    await expect(todoItems).toHaveCount(0);
    console.log('Todo removed successfully');
}
);

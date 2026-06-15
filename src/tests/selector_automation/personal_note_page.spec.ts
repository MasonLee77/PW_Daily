// Playwright
/* 
Viết code automation cho test case sau:
- Đi tới trang: https://material.playwrightvn.com/
- Click vào: Bài học 4: Personal notes
- Thêm note mới có tiêu đề và nội dung: Mason/Xin chào
- Verify chỉ có 1 Note duy nhất được add vào và nội dung/tiêu đề đúng.
- Sửa nội dung note: Xin chào, phiên bản đã chỉnh sửa
- Verify nội dung đã được chỉnh sửa
- Xoá Note
- Verify Note đã được xoá.
*/

import { test, expect } from '@playwright/test';
import { ENV } from '../../utils/env.config';

test('Personal Note Page #1', async ({ page }) => {
    await page.goto(ENV.BASE_URL);

    await page.getByRole('link', { name: 'Bài học 4: Personal notes' }).click();

    const title = 'Mason';
    const content = 'Xin chào';
    await page.getByPlaceholder('Enter note title').fill(title);
    await page.getByPlaceholder('Enter note content').fill(content);
    await page.getByRole('button', { name: 'Add Note' }).click();

    const notes = page.locator("//ul[@id='notes-list']//li");
    await expect(notes).toHaveCount(1);
    await expect(notes.nth(0)).toContainText(title);
    await expect(notes.nth(0)).toContainText(content);
    await expect(page.getByText('Total Notes: 1', { exact: true })).toBeVisible();
    console.log('Note added with correct title and content');

    const editedContent = 'Xin chào, phiên bản đã chỉnh sửa';
    const editButton = notes.locator('button').filter({ hasText: 'Edit' }).first();
    await editButton.click();
    await page.getByPlaceholder('Enter note content').fill(editedContent);
    await page.getByRole('button', { name: 'Add Note' }).click();
    await expect(notes.nth(0)).toContainText(editedContent);
    console.log('Note edited content verified successfully');

    const deleteButton = notes.locator('button').filter({ hasText: 'Delete' }).first();
    await deleteButton.click();
    page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toContain('Are you sure you want to delete this note?');
        await dialog.accept();
    });
    await page.keyboard.press('Enter');
    await expect(notes).toHaveCount(0);
    await expect(page.getByText('Total Notes: 0', { exact: true })).toBeVisible();
    console.log('Note removed successfully');
}
);

/* 
Viết code automation cho test case sau:
- Đi tới trang: https://material.playwrightvn.com/
- Click vào: Bài học 4: Personal notes
- Thêm note mới có tiêu đề và nội dung: Mason/Xin chào
- Thêm note mới khác có tiêu đề và nội dung: Milo/1234
- Verify có 2 Note được add vào và nội dung/tiêu đề đúng.
- Verify chức năng tìm kiếm Note
*/


test('Personal Note Page #2', async ({ page }) => {
    await page.goto(ENV.BASE_URL);
    await page.getByRole('link', { name: 'Bài học 4: Personal notes' }).click();

    const addNote = async (title: string, content: string) => {
        await page.getByPlaceholder('Enter note title').fill(title);
        await page.getByPlaceholder('Enter note content').fill(content);
        await page.getByRole('button', { name: 'Add Note' }).click();
    };

    const title1 = 'Mason';
    const content1 = 'Xin chào';
    await addNote(title1, content1);

    const title2 = 'Milo';
    const content2 = '1234';
    await addNote(title2, content2);

    const notes = page.locator("//ul[@id='notes-list']//li");
    await expect(notes).toHaveCount(2);
    await expect(notes.nth(0)).toContainText(title1);
    await expect(notes.nth(0)).toContainText(content1);
    await expect(notes.nth(1)).toContainText(title2);
    await expect(notes.nth(1)).toContainText(content2);
    await expect(page.getByText('Total Notes: 2', { exact: true })).toBeVisible();
    console.log('Both notes added with correct title and content');

    const searchInput = page.getByPlaceholder('Search notes');
    await searchInput.fill('Mason');
    await expect(notes).toHaveCount(1);
    await expect(notes.nth(0)).toContainText(title1);
    await expect(notes.nth(0)).toContainText(content1);
    await expect(page.getByText('Total Notes: 1', { exact: true })).toBeVisible();
    console.log('Search functionality verified successfully');
}
);
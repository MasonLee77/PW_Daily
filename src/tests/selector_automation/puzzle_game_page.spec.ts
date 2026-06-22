// Playwright
/* 
Viết code automation cho test case sau:
- Đi tới trang: https://material.playwrightvn.com/
- Click vào: Bài học 5: Puzzle drag and drop game
- Kéo thả các ô 1, 2, 3, 4 vào ô tương ứng.
- Verify message trong alert xuất hiện là: "Congratulations! You completed the puzzle."
*/
import { test, expect } from '@playwright/test';
import { ENV } from '../../utils/env.config';

test('Puzzle Game Page', async ({ page }) => {
    await page.goto(ENV.BASE_URL);
    await page.getByRole('link', { name: 'Bài học 5: Puzzle drag and drop game' }).click();

  // Kéo thả các ô 1, 2, 3, 4 vào ô tương ứng
    await page.dragAndDrop('#piece-1', '.dropzone[data-piece="1"]');
    await page.dragAndDrop('#piece-2', '.dropzone[data-piece="2"]');
    await page.dragAndDrop('#piece-3', '.dropzone[data-piece="3"]');
    await page.dragAndDrop('#piece-4', '.dropzone[data-piece="4"]');

  // Verify message trong alert xuất hiện là: "Congratulations! You completed the puzzle."
  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('Congratulations! You completed the puzzle.');
    await dialog.accept();
  });
}); 

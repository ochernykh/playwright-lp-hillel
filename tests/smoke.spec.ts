import { test, expect } from '@playwright/test';

test('should open the base page and have title containing "Hillel"', async ({ page }) => {
    await page.goto('https://qauto.forstudy.space/');
    await expect(page).toHaveTitle(/Hillel/);
});

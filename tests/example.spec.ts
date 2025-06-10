import { test, expect } from '@playwright/test';
import users from '../fixtures/users.json';

const { email, password } = users.defaultUser;


test('should have the correct page title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Hillel Qauto/);
});

test('should successfully authorize the user via the login form', async ({ page }) => {
  await page.goto('/');
  await page.click('.header_signin');

  await page.fill('#signinEmail', email);
  await page.fill('#signinPassword', password);

  const loginButton = page.locator('.modal-footer .btn.btn-primary');
  await expect(loginButton).toBeEnabled();

  await Promise.all([
    page.waitForURL('**/panel/garage'),
    loginButton.click(),
  ]);

  await expect(page).toHaveURL(/\/panel\/garage/);
});


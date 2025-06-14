import { test, expect } from '@playwright/test';
import { testCases } from '../test-data/registrationValidationCases';
import { validFormData, fillRegistrationForm, expectValidationError, } from '../utils/registrationUtils';

test.beforeEach(async ({ page }) => {
    await page.goto('');
    await page.locator('//button[contains(@class,"hero-descriptor_btn")]').click();
});

test.describe('Registration form validation', () => {
    for (const [fieldId, cases] of Object.entries(testCases)) {
        test.describe(`${fieldId} field`, () => {
            for (const { value, error } of cases) {
                test(`should show "${error}" for input: "${value}"`, async ({ page }) => {
                    const data = validFormData({ [fieldId]: value });
                    await fillRegistrationForm(page, data);
                    await expectValidationError(page, fieldId, error);
                });
            }
        });
    }

    test('should show error for mismatched repeat password', async ({ page }) => {
        const data = validFormData({ signupRepeatPassword: 'Mismatch123' });
        await fillRegistrationForm(page, data);
        await expectValidationError(page, 'signupRepeatPassword', 'Passwords do not match');
    });

    test('should be disabled if not all required fields are filled', async ({ page }) => {
        await fillRegistrationForm(page, {
            signupName: 'John',
            signupLastName: 'Doe',
        });
        await expect(page.getByRole('button', { name: /register/i })).toBeDisabled();
    });

    test('registers with valid inputs', async ({ page }) => {
        const data = validFormData();
        await fillRegistrationForm(page, data);
        await expect(page.getByRole('button', { name: /register/i })).toBeEnabled();
        await page.getByRole('button', { name: /register/i }).click();
        await expect(page).toHaveURL(/panel\/garage/);
    });
});

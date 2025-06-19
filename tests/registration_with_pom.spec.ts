import { test } from '@playwright/test';
import { RegistrationModal, RegistrationFormData } from '../pages/RegistrationModal';
import { generateAqaEmail } from '../utils/registrationUtils';
import { testCases } from '../test-data/registrationValidationCases';

test.describe('Registration form validation', () => {
    test.beforeEach(async ({ page }) => {
        const modal = new RegistrationModal(page);
        await modal.openFromLanding();
    });

    for (const [fieldId, cases] of Object.entries(testCases)) {
        for (const { value, error } of cases) {
            const shortValue = typeof value === 'string' ? value.slice(0, 12) : String(value);
            test(`should show error '${error}' for ${fieldId} (value: '${shortValue}')`, async ({ page }) => {
                const modal = new RegistrationModal(page);
                await modal.fillForm({
                    signupName: 'John',
                    signupLastName: 'Doe',
                    signupEmail: generateAqaEmail(),
                    signupPassword: 'Test1234',
                    signupRepeatPassword: 'Test1234',
                    [fieldId]: value,
                });
                await modal.expectValidationError(fieldId, error);
                await modal.expectRegisterDisabled();
            });
        }
    }

    test('should register successfully with valid data', async ({ page }) => {
        const modal = new RegistrationModal(page);
        await modal.fillForm({
            signupName: 'John',
            signupLastName: 'Doe',
            signupEmail: generateAqaEmail(),
            signupPassword: 'Test1234',
            signupRepeatPassword: 'Test1234',
        });
        await modal.submitAndExpectSuccess();
    });
});
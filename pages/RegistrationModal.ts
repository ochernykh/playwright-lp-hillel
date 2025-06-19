import { BaseModal } from './BaseModal';
import { Page, expect, Locator } from '@playwright/test';
import { InputField } from './components/InputField';

export interface RegistrationFormData {
    signupName: string;
    signupLastName: string;
    signupEmail: string;
    signupPassword: string;
    signupRepeatPassword: string;
}

export class RegistrationModal extends BaseModal {
    constructor(page: Page) {
        super(page, '.modal-content');
    }

    async openFromLanding() {
        await this.page.goto('');
        await this.page.locator('//button[contains(@class,"hero-descriptor_btn")]').click();
        await this.expectVisible();
    }

    input(fieldId: string): InputField {
        return new InputField(this.page, fieldId);
    }

    private getRegisterButton(): Locator {
        return this.modal.getByRole('button', { name: /^register$/i });
    }

    async fillForm(data: Partial<RegistrationFormData>) {
        for (const [field, value] of Object.entries(data)) {
            await this.input(field).fill(value || '');
        }
    }

    async expectValidationError(field: string, message: string) {
        await this.input(field).expectValidError(message);
    }

    async expectRegisterEnabled() {
        await expect(this.getRegisterButton()).toBeEnabled();
    }

    async expectRegisterDisabled() {
        await expect(this.getRegisterButton()).toBeDisabled();
    }

    async clickRegister() {
        await this.getRegisterButton().click();
    }

    async expectRedirectToGarage() {
        await expect(this.page).toHaveURL(/panel\/garage/);
    }

    async submitAndExpectSuccess() {
        await this.expectRegisterEnabled();
        await this.clickRegister();
        await this.expectRedirectToGarage();
    }
}
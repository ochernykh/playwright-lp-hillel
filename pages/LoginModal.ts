import { BaseModal } from './BaseModal';
import { Page, expect } from '@playwright/test';

export class LoginModal extends BaseModal {
    constructor(page: Page) {
        super(page, '.modal-content');
    }

    async loginWith(email: string, password: string) {
        await this.getInputById('signinEmail').fill(email);
        await this.getInputById('signinPassword').fill(password);
        await this.getButtonByText('login').click();
    }

    async expectLoginError(message: string) {
        await expect(this.page.getByText(message)).toBeVisible();
    }
}
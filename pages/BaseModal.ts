import { Page, Locator, expect } from '@playwright/test';

export class BaseModal {
    protected page: Page;
    protected modal: Locator;

    constructor(page: Page, modalSelector: string) {
        this.page = page;
        this.modal = page.locator(modalSelector);
    }

    async expectVisible() {
        await expect(this.modal).toBeVisible();
    }

    getInputById(id: string): Locator {
        return this.modal.locator(`#${id}`);
    }

    getButtonByText(text: string): Locator {
        return this.modal.getByRole('button', { name: new RegExp(text, 'i') });
    }
}

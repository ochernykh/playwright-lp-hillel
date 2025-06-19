import { Page, Locator, expect } from '@playwright/test';
export const errorColor = 'rgb(220, 53, 69)';

export class InputField {
    private page: Page;
    private fieldId: string;

    constructor(page: Page, fieldId: string) {
        this.page = page;
        this.fieldId = fieldId;
    }

    get input(): Locator {
        return this.page.locator(`#${this.fieldId}`);
    }

    async fill(value: string) {
        await this.input.fill(value);
    }

    async blur() {
        await this.input.focus();
        await this.input.blur();
    }

    async expectErrorMessage(message: string) {
        await expect(this.page.getByText(message)).toBeVisible();
    }

    async expectBorderIsError() {
        await expect(this.input).toHaveCSS('border-color', errorColor);
    }

    async expectValidError(message: string) {
        await this.blur();
        await this.expectErrorMessage(message);
        await this.expectBorderIsError();
    }
}
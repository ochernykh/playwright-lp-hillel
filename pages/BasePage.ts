import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open(url: string) {
        await this.page.goto(url);
    }

    getButtonByName(name: string): Locator {
        return this.page.getByRole('button', { name: new RegExp(name, 'i') });
    }

    async waitForUrlContains(path: string | RegExp) {
        await expect(this.page).toHaveURL(path);
    }

    async expectAlertVisible(text: string) {
        await expect(this.page.getByText(text)).toBeVisible();
    }
}
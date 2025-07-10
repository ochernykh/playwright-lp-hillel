import { Page } from '@playwright/test';

export default class BaseMockController {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async mockEndpoint(endpoint: string, body: any) {
        await this.page.route(endpoint, async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(body)
            });
        });
    }
}

// fixtures/auth.ts
import { test as base, Page } from '@playwright/test';

type AuthFixtures = {
    authPage: Page;
};

export const test = base.extend<AuthFixtures>({
    authPage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: './test-data/states/userTwoState.json',
        });
        const page = await context.newPage();
        await use(page);
        await context.close();
    },
});

export { expect } from '@playwright/test';

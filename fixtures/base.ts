import { test as base } from '@playwright/test';

type BaseFixtures = {
    baseUrl: string;
};

export const test = base.extend<BaseFixtures>({
    baseUrl: async ({ }, use) => {
        await use(process.env.BASE_URL || 'https://qauto.forstudy.space');
    },
});

export { expect } from '@playwright/test';

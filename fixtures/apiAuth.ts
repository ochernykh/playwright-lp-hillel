import { test as base, APIRequestContext } from '@playwright/test';
import AuthController from '../controllers/AuthController';
import assert from 'assert';

type ApiAuthFixtures = {
    api: APIRequestContext;
    sid: string;
};

export const test = base.extend<ApiAuthFixtures>({
    api: async ({ playwright }, use) => {
        const request = await playwright.request.newContext({
            baseURL: process.env.BASE_URL,
        });
        await use(request);
        await request.dispose();
    },

    sid: async ({ api }, use) => {
        const email = process.env.TEST_USER2_LOGIN;
        const password = process.env.TEST_USER2_PASSWORD;

        assert(email, 'TEST_USER2_LOGIN is not set in .env');
        assert(password, 'TEST_USER2_PASSWORD is not set in .env');

        const auth = new AuthController(api);
        const sidValue = await auth.signInAndGetCookie(email, password);
        await use(sidValue);
    },
});

export { expect } from '@playwright/test';

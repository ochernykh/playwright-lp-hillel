import { test as base } from './auth';
import GaragePage from '../pages/GaragePage';

type UserGarageFixtures = {
    userGarage: GaragePage;
};

export const test = base.extend<UserGarageFixtures>({
    userGarage: async ({ authPage }, use) => {
        const garagePage = new GaragePage(authPage);
        await garagePage.open();
        await use(garagePage);
    },
});

export { expect } from '@playwright/test';

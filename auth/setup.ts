import { request } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

(async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.post(`${process.env.BASE_URL}/api/auth/signin`, {
        data: {
            email: process.env.TEST_USER2_LOGIN,
            password: process.env.TEST_USER2_PASSWORD,
        },
    });

    if (response.ok()) {
        console.log('Logged in successfully via API');
        await apiContext.storageState({ path: './test-data/states/userTwoState.json' });
        console.log('Saved storage state to ./test-data/states/userTwoState.json');
    } else {
        console.error('Login failed:', await response.text());
    }

    await apiContext.dispose();
})();

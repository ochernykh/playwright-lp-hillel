import { APIRequestContext } from '@playwright/test';
import BaseController from './BaseController';

export default class AuthController extends BaseController {
    constructor(request: APIRequestContext) {
        super(request);
    }

    async signInAndGetCookie(email: string, password: string): Promise<string> {
        const response = await this.request.post('/api/auth/signin', {
            data: { email, password },
        });

        const setCookie = response.headers()['set-cookie'];
        const sidValue = setCookie.split(';')[0].split('=')[1];

        return sidValue;
    }
}

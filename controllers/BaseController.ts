import { APIRequestContext, APIResponse } from '@playwright/test';

export default class BaseController {
    protected request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    protected async requestWithCookies(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        cookies: string,
        data?: object
    ): Promise<{ response: APIResponse; json: any }> {
        const options: any = {
            headers: {
                Cookie: `sid=${cookies}`,
                'Content-Type': 'application/json'
            }
        };

        if (data) {
            options.data = data;
        }

        let response: APIResponse;

        switch (method) {
            case 'GET':
                response = await this.request.get(url, options);
                break;
            case 'POST':
                response = await this.request.post(url, options);
                break;
            case 'PUT':
                response = await this.request.put(url, options);
                break;
            case 'DELETE':
                response = await this.request.delete(url, options);
                break;
        }

        return { response, json: await response.json() };
    }
}

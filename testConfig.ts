import * as dotenv from 'dotenv';
dotenv.config();

function required(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const testConfig = {
    baseUrl: required('BASE_URL'),
    httpCredentials: {
        username: required('HTTP_USERNAME'),
        password: required('HTTP_PASSWORD'),
    },
};

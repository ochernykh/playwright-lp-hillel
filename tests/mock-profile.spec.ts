import { test, expect } from '../fixtures/auth';
import UniversalMockController from '../controllers/BaseMockController';

test('should intercept and change user name to Polar Bear', async ({ authPage }) => {
    const mockController = new UniversalMockController(authPage);

    const fakeBody = {
        status: 'ok',
        data: {
            userId: 182661,
            photoFilename: 'default-user.png',
            name: 'Polar',
            lastName: 'Bear',
        },
    };

    await mockController.mockEndpoint('**/api/users/profile', fakeBody);

    await authPage.goto('/panel/profile');
    await authPage.reload();

    await expect(authPage.locator('p.profile_name.display-4')).toHaveText('Polar Bear');
});

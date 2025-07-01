import { test, expect } from '../fixtures/filledGarage';

test('should have pre-added car', async ({ userGarage, carName }) => {
    await userGarage.verifyLastAddedCar(carName);
});

import { test as base } from './userGarage';

type FilledGarageFixtures = {
    carName: string;
};

export const test = base.extend<FilledGarageFixtures>({
    carName: async ({ userGarage }, use) => {
        const car = { brand: 'Audi', model: 'TT', mileage: '123' };
        await userGarage.addCar(car);
        await userGarage.verifyLastAddedCar(`${car.brand} ${car.model}`);
        await use(`${car.brand} ${car.model}`);
        await userGarage.removeLastAddedCar();
    },
});

export { expect } from '@playwright/test';

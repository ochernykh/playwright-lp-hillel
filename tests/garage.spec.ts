import { test, expect } from '../fixtures/userGarage';

test.describe('Garage Page', () => {
    test('should add and remove BMW X6', async ({ userGarage }) => {
        await userGarage.addCar({ brand: 'BMW', model: 'X6', mileage: '500' });
        await userGarage.verifyLastAddedCar('BMW X6');
        await userGarage.removeLastAddedCar();
    });

    test('should add multiple cars', async ({ userGarage }) => {
        await userGarage.addCar({ brand: 'Audi', model: 'TT', mileage: '300' });
        await userGarage.verifyLastAddedCar('Audi TT');

        await userGarage.addCar({ brand: 'Ford', model: 'Fiesta', mileage: '150' });
        await userGarage.verifyLastAddedCar('Ford Fiesta');

        await userGarage.removeAllCars();
    });

    test('should clean up garage completely', async ({ userGarage }) => {
        await userGarage.addCar({ brand: 'Audi', model: 'TT', mileage: '300' });
        await userGarage.addCar({ brand: 'Ford', model: 'Fiesta', mileage: '150' });

        await userGarage.removeAllCars();

        await expect(userGarage.carItems).toHaveCount(0);
    });
});

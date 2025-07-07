import { test, expect } from '../fixtures/apiAuth';
import CarsController from '../controllers/CarsController';

test.describe('API Cars tests', () => {
    let cars: CarsController;

    test.beforeEach(async ({ api }) => {
        cars = new CarsController(api);
    });

    test('should get user cars list (positive)', async ({ sid }) => {
        const carsResponse = await cars.getUserCars(sid);
        expect(carsResponse).toHaveProperty('status', 'ok');
        expect(carsResponse).toHaveProperty('data');
        expect(Array.isArray(carsResponse.data)).toBe(true);
    });

    test('should add new car (positive)', async ({ sid }) => {
        const addResponse = await cars.addCar(1, 1, 500, sid);
        expect(addResponse).toHaveProperty('status', 'ok');
        expect(addResponse).toHaveProperty('data');
        expect(addResponse.data).toHaveProperty('id');
        expect(addResponse.data).toHaveProperty('brand');
    });

    test('should fail adding car with invalid brandId (negative)', async ({ sid }) => {
        const response = await cars.addCar(9999, 1, 500, sid);
        expect(response).toHaveProperty('status', 'error');
    });

    test('should fail adding car with invalid mileage (negative)', async ({ sid }) => {
        const response = await cars.addCar(1, 1, -100, sid);
        expect(response).toHaveProperty('status', 'error');
    });
});

import { expect, Locator, Page } from '@playwright/test';

export default class GaragePage {
    readonly page: Page;
    readonly addCarButton: Locator;
    readonly brandDropdown: Locator;
    readonly modelDropdown: Locator;
    readonly mileageField: Locator;
    readonly confirmAddButton: Locator;
    readonly carItems: Locator;
    readonly removeCarButton: Locator;
    readonly approveRemoveButton: Locator;
    readonly carRemoveNotification: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addCarButton = page.locator('button.btn.btn-primary', { hasText: 'Add car' });
        this.brandDropdown = page.locator('#addCarBrand');
        this.modelDropdown = page.locator('#addCarModel');
        this.mileageField = page.locator('#addCarMileage');
        this.confirmAddButton = page.locator('.modal-footer button.btn.btn-primary', { hasText: 'Add' });
        this.carItems = page.locator('.car.jumbotron');
        this.removeCarButton = page.locator('button.btn.btn-outline-danger');
        this.approveRemoveButton = page.locator('button.btn.btn-danger');
        this.carRemoveNotification = page.locator('.alert.alert-success:has-text("Car removed")');
    }

    async open() {
        await this.page.goto('/panel/garage');
        await expect(this.page.locator('h1')).toHaveText('Garage');
    }

    async addCar({ brand, model, mileage }: { brand: string; model: string; mileage: string }) {
        await this.addCarButton.click();
        await this.brandDropdown.selectOption({ label: brand });
        await this.modelDropdown.selectOption({ label: model });
        await this.mileageField.fill(mileage);
        await this.confirmAddButton.click();
    }

    async verifyLastAddedCar(expectedName: string) {
        await expect(this.carItems.first().locator('p.car_name')).toHaveText(expectedName);
    }

    async removeLastAddedCar() {
        await this.carItems.first().locator('.icon.icon-edit').click();
        await this.removeCarButton.click();
        await this.approveRemoveButton.click();
        await expect(this.carRemoveNotification).toBeVisible();
    }

    async removeAllCars() {
        while (await this.carItems.count() > 0) {
            await this.carItems.first().locator('.icon.icon-edit').click();
            await this.removeCarButton.click();
            await this.approveRemoveButton.click();
            await expect(this.carRemoveNotification).toBeVisible();
            await expect(this.carRemoveNotification).not.toBeVisible({ timeout: 10000 });
        }
    }
}

import { Page, Locator, expect } from '@playwright/test';

export const errorColor = 'rgb(220, 53, 69)';

export function generateAqaEmail() {
  return `aqa-${Date.now()}@test.com`;
}

export const getInput = (page: Page, id: string): Locator =>
  page.locator(`#${id}`);

export const blurField = async (field: Locator): Promise<void> => {
  await field.focus();
  await field.blur();
};

export function validFormData(
  overrides: Partial<Record<string, string>> = {}
): Record<string, string> {
  return {
    signupName: 'John',
    signupLastName: 'Doe',
    signupEmail: generateAqaEmail(),
    signupPassword: 'Test1234',
    signupRepeatPassword: 'Test1234',
    ...overrides,
  };
}

export async function fillRegistrationForm(
  page: Page,
  data: Partial<Record<string, string>>
): Promise<void> {
  for (const [field, value] of Object.entries(data)) {
    await getInput(page, field).fill(value || '');
  }
}

export async function expectValidationError(
  page: Page,
  field: string,
  message: string
): Promise<void> {
  const input = getInput(page, field);
  await blurField(input);
  await expect(page.getByText(message)).toBeVisible();
  await expect(input).toHaveCSS('border-color', errorColor);
  await expect(page.getByRole('button', { name: /register/i })).toBeDisabled();
}

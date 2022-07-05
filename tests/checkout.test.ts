import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';

test('Checkout flow', async ({ page }) => {
  await page.goto(`${baseUrl}products/6`);

  await page.locator('text=Add to cart').click();

  const cartIcon = await page.locator('data-test-id=cart-link');

  await cartIcon.click();

  const checkoutButton = await page.locator('data-test-id=cart-checkout');

  await checkoutButton.click();

  await expect(page).toHaveURL(`${baseUrl}checkout`);

  await page.fill('data-test-id=checkout-first-name', 'Name');
  await page.fill('data-test-id=checkout-last-name', 'Last');
  await page.fill('data-test-id=checkout-email', 'email@gmail.com');
  await page.fill('data-test-id=checkout-address', 'Address 123');
  await page.fill('data-test-id=checkout-city', 'Now');
  await page.fill('data-test-id=checkout-postal-code', '1000');
  await page.fill('data-test-id=checkout-country', 'Austria');
  await page.fill('data-test-id=checkout-credit-card', '123456789');
  await page.fill('data-test-id=checkout-expiration-date', '12');
  await page.fill('data-test-id=checkout-security-code', '123');

  const confirmOrderButton = await page.locator(
    'data-test-id=checkout-confirm-order',
  );

  await confirmOrderButton.click();

  await expect(page).toHaveURL(`${baseUrl}success`);
});

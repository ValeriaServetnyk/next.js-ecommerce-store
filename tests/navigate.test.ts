import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';

test('navigation test', async ({ page }) => {
  await page.goto(baseUrl);
  const titleLocator = page.locator('h1');
  await expect(titleLocator).toHaveText('Free shipping');
  await page.locator('text=Shop Now').click();
  await expect(page).toHaveURL(`${baseUrl}products`);
  await expect(titleLocator).toHaveText('Best Selling');
  await page.locator('text=Cat Bread Shirt').click();
  await expect(page).toHaveURL(`${baseUrl}products/1`);

  await page.locator('text=add to cart').click();
  await page.locator('text=+').click();
});

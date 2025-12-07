import { test, expect } from '@playwright/test';

test('Playwright locator örnekleri', async ({ page }) => {
  // Örnek sayfa yükleme
  await page.goto('https://playwright.dev/');

  // --- getByRole örneği ---
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page).toHaveURL(/.*intro/);

  // --- locator ile seçim ---
  const searchInput = page.locator('input[type="search"]');
  await searchInput.fill('test');

  // --- getByPlaceholder örneği ---
  await page.getByPlaceholder('Search').fill('api');

  // --- getByText örneği ---
  await page.getByText('Introduction').click();

  // --- getByLabel örneği (kendi test HTML'inde daha anlamlıdır) ---
  // Bu örnek, label'ın for attributeyle input bağladığı yapılar içindir
  // await page.getByLabel('Username').fill('Ali');

  // --- getByAltText örneği (img alt varsa) ---
  // await page.getByAltText('Company Logo').click();

  // --- getByTitle örneği (title attribute varsa) ---
  // await page.getByTitle('tooltip text').hover();
});

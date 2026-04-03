const { test, expect } = require('@playwright/test');

// Example tests using different Playwright features

test.describe('Basic Navigation Tests', () => {
  test('should navigate to external URL', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('should navigate to Wikipedia', async ({ page }) => {
    await page.goto('https://www.wikipedia.org');
    await expect(page).toHaveTitle(/Wikipedia/);
  });
});

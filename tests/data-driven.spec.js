const { test, expect } = require('@playwright/test');

const urls = [
  { url: 'https://example.com', title: 'Example Domain' },
  { url: 'https://www.wikipedia.org', title: 'Wikipedia' },
];

test.describe('Data-driven URL tests', () => {
  for (const { url, title } of urls) {
    test(`validate title on ${url}`, async ({ page }) => {
      await page.goto(url);
      await expect(page).toHaveTitle(new RegExp(title));
    });
  }
});

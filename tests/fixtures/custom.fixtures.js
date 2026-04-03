const { test: base, expect } = require('@playwright/test');

const test = base.extend({
  user: async ({ page }, use) => {
    await page.goto('https://example.com');
    await use({
      name: 'automated-user',
    });
  },
});

module.exports = { test, expect };

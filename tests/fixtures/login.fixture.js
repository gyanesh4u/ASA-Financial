const { test: base } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');

/**
 * Create a shared login page fixture that is reused across tests
 * This opens the login page once and reuses the same page instance
 */
const test = base.extend({
  loginPage: async ({ page }, use) => {
    // Setup: Open login page once
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    // Use the same loginPage instance across all tests in this fixture
    await use(loginPage);
    
    // Teardown: Optional cleanup after all tests
    // The page is automatically closed after the test suite
  },
});

module.exports = { test };

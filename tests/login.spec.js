const { test } = require('./fixtures/login.fixture');
const { expect } = require('@playwright/test');

// Test credentials
const TEST_EMAIL = 'gyanesh.kamal@asa.financial';
const TEST_PASSWORD = 'Windowvista1#';

test.describe('ASA Central Login Tests', () => {
  
  test('should allow user to login with valid credentials', async ({ loginPage }) => {
    // Print page title
    const pageTitle = await loginPage.page.title();
    console.log('Page Title:', pageTitle);
    
    await loginPage.usernameInput.fill(TEST_EMAIL);
    await loginPage.passwordInput.fill(TEST_PASSWORD);

    await expect(loginPage.usernameInput).toHaveValue(TEST_EMAIL);
    await expect(loginPage.passwordInput).toHaveValue(TEST_PASSWORD);
    
    const loginButtonText = await loginPage.loginButton.innerText();
    expect(loginButtonText).toContain('Login');
    
    // Click the login button
    await loginPage.loginButton.click();
    
    // Wait until title changes to "Manage Fintech"
    await loginPage.page.waitForFunction(
      () => document.title === 'Manage Fintech',
      { timeout: 30000 }
    );
    
    const newPageTitle = await loginPage.page.title();
    console.log('Page Title after login:', newPageTitle);
    expect(newPageTitle).toBe('Manage Fintech');
  });
});

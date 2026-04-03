const { test } = require('./fixtures/login.fixture');
const { expect } = require('@playwright/test');

// Test credentials
const TEST_EMAIL = 'gyanesh.kamal@asa.financial';
const TEST_PASSWORD = 'Windowvista1#';

test.describe('ASA Central Login Tests', () => {
  
  test('should allow user to login with valid credentials', async ({ loginPage }, testInfo) => {
    // Print page title
    const pageTitle = await loginPage.page.title();
    console.log('Page Title:', pageTitle);
    
    // Screenshot 1: Login page
    const screenshot1 = await loginPage.page.screenshot();
    await testInfo.attach('01-login-page', { body: screenshot1, contentType: 'image/png' });
    await loginPage.page.screenshot({ path: 'screenshots/01-login-page.png' });
    console.log('Screenshot 1: Login page captured');
    
    await loginPage.usernameInput.fill(TEST_EMAIL);
    
    // Screenshot 2: After entering email
    const screenshot2 = await loginPage.page.screenshot();
    await testInfo.attach('02-email-entered', { body: screenshot2, contentType: 'image/png' });
    await loginPage.page.screenshot({ path: 'screenshots/02-email-entered.png' });
    console.log('Screenshot 2: Email entered');
    
    await loginPage.passwordInput.fill(TEST_PASSWORD);

    // Screenshot 3: After entering password
    const screenshot3 = await loginPage.page.screenshot();
    await testInfo.attach('03-password-entered', { body: screenshot3, contentType: 'image/png' });
    await loginPage.page.screenshot({ path: 'screenshots/03-password-entered.png' });
    console.log('Screenshot 3: Password entered');

    await expect(loginPage.usernameInput).toHaveValue(TEST_EMAIL);
    await expect(loginPage.passwordInput).toHaveValue(TEST_PASSWORD);
    
    const loginButtonText = await loginPage.loginButton.innerText();
    expect(loginButtonText).toContain('Login');
    
    // Screenshot 4: Before clicking login
    const screenshot4 = await loginPage.page.screenshot();
    await testInfo.attach('04-before-login-click', { body: screenshot4, contentType: 'image/png' });
    await loginPage.page.screenshot({ path: 'screenshots/04-before-login-click.png' });
    console.log('Screenshot 4: Before login click');
    
    // Click the login button
    await loginPage.loginButton.click();
    
    // Screenshot 5: After clicking login (loading state)
    await loginPage.page.waitForTimeout(2000);
    const screenshot5 = await loginPage.page.screenshot();
    await testInfo.attach('05-loading-state', { body: screenshot5, contentType: 'image/png' });
    await loginPage.page.screenshot({ path: 'screenshots/05-loading-state.png' });
    console.log('Screenshot 5: Loading state');
    
    // Wait until title changes to "Manage Fintech"
    await loginPage.page.waitForFunction(
      () => document.title === 'Manage Fintech',
      { timeout: 30000 }
    );
    
    // Screenshot 6: Dashboard after successful login
    const screenshot6 = await loginPage.page.screenshot();
    await testInfo.attach('06-dashboard-loaded', { body: screenshot6, contentType: 'image/png' });
    await loginPage.page.screenshot({ path: 'screenshots/06-dashboard-loaded.png' });
    console.log('Screenshot 6: Dashboard loaded');
    
    const newPageTitle = await loginPage.page.title();
    console.log('Page Title after login:', newPageTitle);
    expect(newPageTitle).toBe('Manage Fintech');
    
    // Assert title using Playwright assertion
    await expect(loginPage.page).toHaveTitle('Manage Fintech');
  });
});

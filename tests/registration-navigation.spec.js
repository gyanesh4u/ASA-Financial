const { test } = require('@playwright/test');
const { expect } = require('@playwright/test');
const { LoginPage } = require('./pages/login.page');
const { ManageFintech } = require('./pages/manage-fintech.page');
const { RegistrationPage } = require('./pages/registration.page');

// Test credentials
const TEST_EMAIL = 'gyanesh.kamal@asa.financial';
const TEST_PASSWORD = 'Windowvista1#';

test.describe('Registration Section Tests', () => {
  
  test('should navigate to registration section on Manage Fintech page', async ({ page }, testInfo) => {
    // Allure Annotations
    testInfo.annotations.push(
      { type: 'feature', description: 'Manage Fintech' },
      { type: 'story', description: 'Registration Section Navigation' },
      { type: 'severity', description: 'high' },
      { type: 'owner', description: 'QA Team' },
      { type: 'tag', description: 'navigation' },
      { type: 'tag', description: 'registration' }
    );
    
    testInfo.description = 'Verify user can navigate to Registration section from Manage Fintech dashboard';
    
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.usernameInput.fill(TEST_EMAIL);
    await loginPage.passwordInput.fill(TEST_PASSWORD);
    await loginPage.loginButton.click();
    
    // Step 2: Wait for dashboard
    await page.waitForFunction(
      () => document.title === 'Manage Fintech',
      { timeout: 30000 }
    );
    
    console.log('✓ Manage Fintech dashboard loaded');
    
    // Step 3: Take screenshot of dashboard
    const dashboardScreenshot = await page.screenshot();
    await testInfo.attach('01-manage-fintech-dashboard', { body: dashboardScreenshot, contentType: 'image/png' });
    await page.screenshot({ path: 'screenshots/manage-fintech-dashboard.png' });
    
    // Step 4: Initialize dashboard page object
    const dashboard = new ManageFintech(page);
    await dashboard.waitForDashboardLoad();
    
    // Step 5: Click on Registration menu item
    console.log('✓ Clicking on Registration menu item');
    await dashboard.clickRegistration();
    
    // Step 6: Wait for registration section to load
    await page.waitForLoadState('networkidle');
    
    // Step 7: Take screenshot of registration section
    const registrationScreenshot = await page.screenshot();
    await testInfo.attach('02-registration-section', { body: registrationScreenshot, contentType: 'image/png' });
    await page.screenshot({ path: 'screenshots/registration-section.png' });
    
    console.log('✓ Registration section loaded on Manage Fintech page');
    
    // Step 8: Verify navigation to registration section
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    // Verify we're in the registration section (part of Manage Fintech)
    expect(currentUrl).toContain('fintech-portal/registration');
    
    console.log('✓ Successfully navigated to Registration section on Manage Fintech page');
  });
});

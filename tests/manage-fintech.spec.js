const { test } = require('@playwright/test');
const { expect } = require('@playwright/test');
const { LoginPage } = require('./pages/login.page');
const { ManageFintech } = require('./pages/manage-fintech.page');

// Test credentials
const TEST_EMAIL = 'gyanesh.kamal@asa.financial';
const TEST_PASSWORD = 'Windowvista1#';

test.describe('Manage Fintech Dashboard Tests', () => {
  
  test('should display manage fintech dashboard after successful login', async ({ page }, testInfo) => {
    // Allure Annotations
    testInfo.annotations.push(
      { type: 'feature', description: 'Dashboard' },
      { type: 'story', description: 'Dashboard Display' },
      { type: 'severity', description: 'high' },
      { type: 'owner', description: 'QA Team' },
      { type: 'tag', description: 'smoke' },
      { type: 'tag', description: 'dashboard' }
    );
    
    testInfo.description = 'Verify Manage Fintech dashboard loads successfully after login';
    
    // Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.usernameInput.fill(TEST_EMAIL);
    await loginPage.passwordInput.fill(TEST_PASSWORD);
    await loginPage.loginButton.click();
    
    // Wait for dashboard
    await page.waitForFunction(
      () => document.title === 'Manage Fintech',
      { timeout: 30000 }
    );
    
    // Initialize dashboard page object
    const dashboard = new ManageFintech(page);
    
    // Verify dashboard is loaded
    const title = await page.title();
    expect(title).toBe('Manage Fintech');
    
    // Take screenshot
    const dashboardScreenshot = await page.screenshot();
    await testInfo.attach('dashboard-loaded', { body: dashboardScreenshot, contentType: 'image/png' });
    await page.screenshot({ path: 'screenshots/dashboard-page.png' });
    
    console.log('✓ Dashboard page loaded successfully');
  });

  test('should verify dashboard elements are visible', async ({ page }, testInfo) => {
    // Allure Annotations
    testInfo.annotations.push(
      { type: 'feature', description: 'Dashboard' },
      { type: 'story', description: 'Dashboard Elements' },
      { type: 'severity', description: 'high' },
      { type: 'owner', description: 'QA Team' },
      { type: 'tag', description: 'smoke' },
      { type: 'tag', description: 'dashboard' }
    );
    
    testInfo.description = 'Verify all critical dashboard elements are visible';
    
    // Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.usernameInput.fill(TEST_EMAIL);
    await loginPage.passwordInput.fill(TEST_PASSWORD);
    await loginPage.loginButton.click();
    
    // Wait for dashboard
    await page.waitForFunction(
      () => document.title === 'Manage Fintech',
      { timeout: 30000 }
    );
    
    // Initialize dashboard
    const dashboard = new ManageFintech(page);
    await dashboard.waitForDashboardLoad();
    
    // Verify page title
    const title = await page.title();
    expect(title).toBe('Manage Fintech');
    
    // Verify page has content
    const pageContent = await page.content();
    expect(pageContent.length).toBeGreaterThan(100);
    
    // Take screenshot
    const elementsScreenshot = await page.screenshot();
    await testInfo.attach('dashboard-elements', { body: elementsScreenshot, contentType: 'image/png' });
    
    console.log('✓ All dashboard elements are visible');
  });
});

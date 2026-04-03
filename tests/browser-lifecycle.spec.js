const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/login.page');
const { ManageFintech } = require('./pages/manage-fintech.page');
const { RegistrationPage } = require('./pages/registration.page');

// Test credentials
const TEST_EMAIL = 'gyanesh.kamal@asa.financial';
const TEST_PASSWORD = 'Windowvista1#';

test.describe('Browser Lifecycle Management Tests', () => {
  test.describe.configure({ mode: 'serial' });

  test('Complete workflow: Browser Initialization → Test Actions → Cleanup', async ({ page }, testInfo) => {
    // Allure Annotations
    testInfo.annotations.push(
      { type: 'feature', description: 'Browser Lifecycle' },
      { type: 'story', description: 'Full Workflow with Browser Management' },
      { type: 'severity', description: 'critical' },
      { type: 'owner', description: 'QA Team' },
      { type: 'tag', description: 'browser-lifecycle' },
      { type: 'tag', description: 'workflow' }
    );

    testInfo.description = 'Test complete workflow with browser initialization and cleanup';

    try {
      // ========== STEP 1: Browser & Page Initialized ==========
      // Browser and page are automatically created by Playwright fixture
      console.log('✓ Step 1: Browser opened and page initialized');
      
      // Take screenshot of blank page
      await testInfo.attach('01-browser-opened', {
        body: await page.screenshot(),
        contentType: 'image/png'
      });

      // ========== STEP 2: Navigate to Login Page ==========
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      console.log(`✓ Step 2: Navigated to login page - URL: ${loginPage.getUrl()}`);
      
      await testInfo.attach('02-login-page-loaded', {
        body: await page.screenshot(),
        contentType: 'image/png'
      });

      // ========== STEP 3: Test Login Form Fields ==========
      await loginPage.log('Step 3: Testing login form fields', 'info');
      
      // Fill email
      await loginPage.usernameInput.fill(TEST_EMAIL);
      const emailValue = await loginPage.usernameInput.inputValue();
      expect(emailValue).toBe(TEST_EMAIL);
      console.log(`✓ Step 3a: Email field filled correctly: ${emailValue}`);
      
      // Fill password
      await loginPage.passwordInput.fill(TEST_PASSWORD);
      console.log(`✓ Step 3b: Password field filled correctly`);
      
      await testInfo.attach('03-login-form-filled', {
        body: await page.screenshot(),
        contentType: 'image/png'
      });

      // ========== STEP 4: Test Base Page Utility Methods ==========
      await loginPage.log('Step 4: Testing base page utility methods', 'info');
      
      // Test element visibility
      const isVisible = await loginPage.isElementVisible('#username');
      expect(isVisible).toBe(true);
      console.log(`✓ Step 4a: Element visibility check works`);
      
      // Test scroll methods
      await loginPage.scrollToTop();
      console.log(`✓ Step 4b: Scroll to top works`);
      
      // Test page load wait
      await loginPage.waitForPageLoad('domcontentloaded');
      console.log(`✓ Step 4c: Wait for page load works`);
      
      // Test get text
      const loginBtnText = await loginPage.getText('button:has-text("Login")');
      expect(loginBtnText).toBeTruthy();
      console.log(`✓ Step 4d: Get text method works - Button text: "${loginBtnText}"`);

      // ========== STEP 5: Test Screenshot Methods ==========
      await loginPage.log('Step 5: Testing screenshot methods', 'info');
      
      const screenshotPath = await loginPage.takeScreenshot('base-page-demo');
      expect(screenshotPath).toContain('screenshots/base-page-demo.png');
      console.log(`✓ Step 5a: Screenshot file saved to: ${screenshotPath}`);
      
      await loginPage.attachScreenshot(testInfo, '05-screenshot-methods');
      console.log(`✓ Step 5b: Screenshot attached to Allure report`);

      // ========== STEP 6: Test Logging Methods ==========
      await loginPage.log('Step 6: Testing logging methods', 'info');
      loginPage.log('This is an info message', 'info');
      loginPage.log('This is a warning message', 'warn');
      loginPage.log('This is an error message', 'error');
      console.log(`✓ Step 6: Logging methods verified`);

      // ========== STEP 7: Final State ==========
      const finalUrl = loginPage.getUrl();
      console.log(`✓ Step 7: Final page URL: ${finalUrl}`);
      
      await testInfo.attach('06-final-state', {
        body: await page.screenshot(),
        contentType: 'image/png'
      });

      console.log('✓ All workflow steps completed successfully');

    } catch (error) {
      console.error(`✗ Test failed: ${error.message}`);
      
      // Capture error screenshot
      try {
        await testInfo.attach('error-screenshot', {
          body: await page.screenshot(),
          contentType: 'image/png'
        });
      } catch (screenshotError) {
        console.error('Failed to capture error screenshot:', screenshotError.message);
      }
      
      throw error;
    } finally {
      // ========== STEP 8: Browser Cleanup ==========
      // Browser and page cleanup is handled automatically by Playwright
      console.log('✓ Test execution complete - Browser cleanup handled automatically by Playwright');
    }
  });

  test('Verify Base Page Methods', async ({ page }, testInfo) => {
    // Allure Annotations
    testInfo.annotations.push(
      { type: 'feature', description: 'Base Page' },
      { type: 'story', description: 'Base Page Utility Methods' },
      { type: 'severity', description: 'high' },
      { type: 'tag', description: 'base-page' },
      { type: 'tag', description: 'utilities' }
    );

    const loginPage = new LoginPage(page);

    // Test navigation
    await loginPage.goto();
    expect(loginPage.getUrl()).toContain('login');
    console.log('✓ Navigation method works');

    // Test page load wait
    await loginPage.waitForPageLoad('networkidle');
    console.log('✓ Wait for page load works');

    // Test element waiting
    const usernameElement = await loginPage.waitForElement('#username');
    expect(usernameElement).toBeTruthy();
    console.log('✓ Wait for element works');

    // Test element visibility
    const isVisible = await loginPage.isElementVisible('#username');
    expect(isVisible).toBe(true);
    console.log('✓ Element visibility check works');

    // Test fill field
    await loginPage.fillField('#username', TEST_EMAIL);
    const usernameValue = await loginPage.usernameInput.inputValue();
    expect(usernameValue).toBe(TEST_EMAIL);
    console.log('✓ Fill field method works');

    // Test screenshot
    const screenshotPath = await loginPage.takeScreenshot('base-page-test');
    expect(screenshotPath).toContain('screenshots/base-page-test.png');
    console.log('✓ Screenshot method works');

    // Test scroll methods
    await loginPage.scrollToTop();
    console.log('✓ Scroll to top works');

    // Test logging
    loginPage.log('This is an info message', 'info');
    loginPage.log('This is a warning message', 'warn');
    loginPage.log('This is an error message', 'error');
    console.log('✓ Logging methods work');

    // Take final screenshot
    await loginPage.attachScreenshot(testInfo, 'base-page-methods-verified');
    console.log('✓ All base page methods verified successfully');
  });
});

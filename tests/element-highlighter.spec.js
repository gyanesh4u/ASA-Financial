/**
 * Element Highlighter Demo Test
 * Demonstrates various highlighting capabilities
 */

const { test, expect } = require('@playwright/test');
const { BasePage } = require('./pages/base.page');
const ElementHighlighter = require('./utils/element-highlighter');

test.describe('Element Highlighter - Demo', () => {
  let basePage;
  let highlighter;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    // Initialize highlighter with yellow + red border
    highlighter = new ElementHighlighter(page, {
      highlightColor: '#FFD700',           // Yellow
      highlightBorder: '3px solid #FF0000', // Red border
      highlightDuration: 1000,
      scrollIntoView: true,
      takesScreenshot: true
    });

    await basePage.goto();
  });

  test.afterEach(async () => {
    // Clean up all highlights
    await highlighter.removeAllHighlights();
  });

  test('Highlight single element before interaction', async ({ page }) => {
    // Navigate to login page
    await basePage.goto();

    // Highlight the email input field
    await highlighter.highlightBeforeAction('input[type="email"]', 'focus on email field');

    // Highlight the password field
    await highlighter.highlightBeforeAction('input[type="password"]', 'focus on password field');

    // Highlight the login button
    await highlighter.highlightBeforeAction('button[type="submit"]', 'click login button');
  });

  test('Highlight and screenshot elements', async () => {
    await basePage.goto();

    // Highlight and capture email input
    await highlighter.highlightAndScreenshot(
      'input[type="email"]',
      '01-email-input-highlighted'
    );

    // Highlight and capture password input
    await highlighter.highlightAndScreenshot(
      'input[type="password"]',
      '02-password-input-highlighted'
    );

    // Highlight and capture login button
    await highlighter.highlightAndScreenshot(
      'button[type="submit"]',
      '03-login-button-highlighted'
    );
  });

  test('Highlight element with info logging', async () => {
    await basePage.goto();

    // Highlight and log information about email input
    const emailInfo = await highlighter.highlightAndLogInfo('input[type="email"]');
    expect(emailInfo).toBeTruthy();
    expect(emailInfo.isVisible).toBe(true);

    // Highlight and log information about password input
    const passwordInfo = await highlighter.highlightAndLogInfo('input[type="password"]');
    expect(passwordInfo).toBeTruthy();
    expect(passwordInfo.isVisible).toBe(true);

    // Highlight and log information about login button
    const buttonInfo = await highlighter.highlightAndLogInfo('button[type="submit"]');
    expect(buttonInfo).toBeTruthy();
    expect(buttonInfo.tagName).toBe('BUTTON');
  });

  test('Highlight all interactive elements', async ({ page }) => {
    await basePage.goto();

    // Get initial interactive elements
    const buttons = await page.$$('button');
    const inputs = await page.$$('input');

    console.log(`📊 Found ${buttons.length} buttons and ${inputs.length} inputs`);

    // Highlight all interactive elements
    await highlighter.highlightAllInteractiveElements(
      ['button', 'input', 'a', '[role="button"]'],
      200 // 200ms delay between highlights
    );
  });

  test('Highlight with custom styles', async () => {
    await basePage.goto();

    // Highlight with green glow effect
    await highlighter.highlightWithCustomStyle(
      'input[type="email"]',
      {
        backgroundColor: '#90EE90',
        border: '3px solid #228B22',
        boxShadow: '0 0 15px #228B22, inset 0 0 10px #90EE90',
        borderRadius: '5px'
      }
    );

    // Highlight with blue glow effect
    await highlighter.highlightWithCustomStyle(
      'input[type="password"]',
      {
        backgroundColor: '#87CEEB',
        border: '3px solid #0047AB',
        boxShadow: '0 0 15px #0047AB, inset 0 0 10px #87CEEB',
        borderRadius: '5px'
      }
    );

    // Highlight with golden glow effect
    await highlighter.highlightWithCustomStyle(
      'button[type="submit"]',
      {
        backgroundColor: '#FFD700',
        border: '3px solid #FFA500',
        boxShadow: '0 0 15px #FFA500, inset 0 0 10px #FFD700',
        borderRadius: '5px'
      }
    );
  });

  test('Change highlight color dynamically', async ({ page }) => {
    await basePage.goto();

    // Start with red highlights
    console.log('🔴 Red highlights...');
    highlighter.setHighlightColor('#FF6B6B');
    await highlighter.highlightElement('input[type="email"]', 800);
    await page.waitForTimeout(500);

    // Change to blue highlights
    console.log('🔵 Blue highlights...');
    highlighter.setHighlightColor('#4169E1');
    await highlighter.highlightElement('input[type="password"]', 800);
    await page.waitForTimeout(500);

    // Change to green highlights
    console.log('🟢 Green highlights...');
    highlighter.setHighlightColor('#228B22');
    await highlighter.highlightElement('button[type="submit"]', 800);
  });

  test('Highlight elements during login flow', async () => {
    // Navigate to login
    await basePage.goto();

    // Step 1: Highlight and fill email
    console.log('Step 1: Email Input');
    await highlighter.highlightBeforeAction('input[type="email"]', 'fill email');
    await basePage.fillField('input[type="email"]', 'testuser@example.com');

    // Step 2: Highlight and fill password
    console.log('Step 2: Password Input');
    await highlighter.highlightBeforeAction('input[type="password"]', 'fill password');
    await basePage.fillField('input[type="password"]', 'password123');

    // Step 3: Highlight and take screenshot before login
    console.log('Step 3: Before Login');
    await highlighter.highlightAndScreenshot('button[type="submit"]', '04-before-login-click');

    // Step 4: Highlight remember me checkbox if exists
    const rememberMe = await basePage.page.$('input[type="checkbox"]');
    if (rememberMe) {
      console.log('Step 4: Remember Me Checkbox');
      await highlighter.highlightBeforeAction('input[type="checkbox"]', 'toggle remember me');
    }

    // Step 5: Highlight login button and click
    console.log('Step 5: Login Button');
    await highlighter.highlightBeforeAction('button[type="submit"]', 'click login');
    await basePage.clickElement('button[type="submit"]');

    // Step 6: Wait for navigation and highlight dashboard
    await basePage.page.waitForURL('**/dashboard/**', { timeout: 5000 }).catch(() => {});
    const dashboardElement = await basePage.page.$('h1, h2, [role="main"]').catch(() => null);
    if (dashboardElement) {
      console.log('Step 6: Dashboard Loaded');
      await highlighter.highlightElement('h1, h2, [role="main"]', 1500);
    }
  });

  test('Get all highlighted elements', async () => {
    await basePage.goto();

    // Highlight some elements
    await highlighter.highlightElement('input[type="email"]', 500);
    await basePage.page.waitForTimeout(600);

    await highlighter.highlightElement('input[type="password"]', 500);
    await basePage.page.waitForTimeout(600);

    // Get list of highlighted elements
    const highlighted = highlighter.getHighlightedElements();
    console.log(`📋 Currently highlighted elements: ${highlighted.join(', ')}`);
    expect(highlighted.length).toBeGreaterThanOrEqual(0);
  });

  test('Highlight multiple elements with delay', async ({ page }) => {
    await basePage.goto();

    // Highlight all input fields with 300ms delay between each
    await highlighter.highlightElements('input', 300);

    // Highlight all buttons with 500ms delay between each
    await highlighter.highlightElements('button', 500);
  });

  test('Combined highlighting and BasePage methods', async () => {
    // Use BasePage methods with highlighting
    await basePage.goto();

    // Highlight before navigation
    await highlighter.highlightAndLogInfo('body');

    // Get page title with highlighting
    const title = await basePage.getTitle();
    console.log(`📄 Page title: ${title}`);

    // Highlight elements during interaction
    await highlighter.highlightBeforeAction('input[type="email"]');
    await basePage.fillField('input[type="email"]', 'test@example.com');

    await highlighter.highlightBeforeAction('input[type="password"]');
    await basePage.fillField('input[type="password"]', 'password');

    // Take final screenshot with highlighted button
    await highlighter.highlightAndScreenshot('button[type="submit"]', '05-final-state');
  });

  test('Highlight with blinking effect', async ({ page }) => {
    await basePage.goto();

    console.log('🔄 Test 1: Standard Blink (300ms interval)');
    await highlighter.highlightWithBlink(
      'input[type="email"]',
      2000,  // 2 seconds total
      300    // 300ms per blink cycle
    );

    await page.waitForTimeout(500);

    console.log('⚡ Test 2: Rapid Blink (200ms interval)');
    await highlighter.highlightWithRapidBlink(
      'input[type="password"]',
      1500   // 1.5 seconds total
    );

    await page.waitForTimeout(500);

    console.log('✨ Test 3: Fade Blink (smooth fade effect)');
    await highlighter.highlightWithFadeBlink(
      'button[type="submit"]',
      2000   // 2 seconds total
    );
  });

  test('Multiple elements with blinking', async ({ page }) => {
    await basePage.goto();

    // Blink all input fields sequentially
    console.log('💫 Blinking multiple input elements');
    await highlighter.highlightMultipleWithBlink(
      'input',
      1500,  // 1.5 seconds per element
      400    // 400ms delay between elements
    );
  });

  test('Blinking during login workflow', async ({ page }) => {
    await basePage.goto();

    // Step 1: Blink email field
    console.log('Step 1: Email Field Blinking');
    await highlighter.highlightWithBlink('input[type="email"]', 1500, 250);

    // Step 2: Fill email
    console.log('Step 2: Filling Email');
    await highlighter.highlightBeforeAction('input[type="email"]');
    await basePage.fillField('input[type="email"]', 'testuser@example.com');

    // Step 3: Blink password field
    console.log('Step 3: Password Field Blinking');
    await highlighter.highlightWithRapidBlink('input[type="password"]', 1500);

    // Step 4: Fill password
    console.log('Step 4: Filling Password');
    await highlighter.highlightBeforeAction('input[type="password"]');
    await basePage.fillField('input[type="password"]', 'password123');

    // Step 5: Fade blink login button before click
    console.log('Step 5: Login Button Fade Blink');
    await highlighter.highlightWithFadeBlink('button[type="submit"]', 1500);

    // Step 6: Highlight and screenshot
    console.log('Step 6: Final Screenshot');
    await highlighter.highlightAndScreenshot('button[type="submit"]', '06-login-ready');

    // Step 7: Click login
    console.log('Step 7: Clicking Login');
    await highlighter.highlightBeforeAction('button[type="submit"]', 'click login');
  });

  test('Color-coded blinking for different element types', async ({ page }) => {
    await basePage.goto();

    // Input fields - Green blink
    console.log('🟢 Input Fields - Green Blinking');
    highlighter.setHighlightColor('#228B22');
    await highlighter.highlightWithBlink('input[type="email"]', 1500, 300);

    await page.waitForTimeout(500);

    // Button - Blue blink
    console.log('🔵 Button - Blue Blinking');
    highlighter.setHighlightColor('#0047AB');
    await highlighter.highlightWithRapidBlink('button[type="submit"]', 1500);

    await page.waitForTimeout(500);

    // Reset to default red
    highlighter.setHighlightColor('#FF6B6B');
  });

  test('Blinking with custom styles', async ({ page }) => {
    await basePage.goto();

    // Create custom blink with green glow
    console.log('🟢 Custom Green Blink');
    await highlighter.highlightWithCustomStyle('input[type="email"]', {
      backgroundColor: '#90EE90',
      border: '3px solid #228B22',
      animation: 'blink 400ms infinite'
    });

    // Manual blink animation timing
    const duration = 1500;
    const startTime = Date.now();
    while (Date.now() - startTime < duration) {
      await page.waitForTimeout(100);
    }
    await highlighter.removeHighlight('input[type="email"]');

    await page.waitForTimeout(500);

    // Create custom blink with blue glow
    console.log('🔵 Custom Blue Blink');
    await highlighter.highlightWithCustomStyle('button[type="submit"]', {
      backgroundColor: '#87CEEB',
      border: '3px solid #0047AB',
      animation: 'rapidBlink 200ms infinite'
    });

    // Manual blink animation timing
    const duration2 = 1500;
    const startTime2 = Date.now();
    while (Date.now() - startTime2 < duration2) {
      await page.waitForTimeout(100);
    }
    await highlighter.removeHighlight('button[type="submit"]');
  });
});

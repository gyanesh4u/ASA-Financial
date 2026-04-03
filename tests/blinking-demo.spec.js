/**
 * Simple Blinking Effect Demo Test
 * Demonstrates blinking effects without complex page.evaluate() issues
 */

const { test, expect } = require('@playwright/test');
const { BasePage } = require('./pages/base.page');
const ElementHighlighter = require('./utils/element-highlighter');

test.describe('Blinking Effects - Simple Demo', () => {
  let basePage;
  let highlighter;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    highlighter = new ElementHighlighter(page, {
      highlightColor: '#FFD700',           // Yellow
      highlightBorder: '3px solid #FF0000', // Red border
      highlightDuration: 1000,
      scrollIntoView: true
    });

    await basePage.goto();
  });

  test.afterEach(async () => {
    await highlighter.removeAllHighlights();
  });

  test('Simple blinking - Yellow with Red border', async ({ page }) => {
    console.log('🟡 Testing Blinking Effect with Yellow + Red Border');
    
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');
    
    // Find email input and highlight it
    const emailInput = await page.$('input[type="email"]');
    if (emailInput) {
      console.log('✓ Email input found - Starting blinking');
      await highlighter.highlightElement('input[type="email"]', 2000);
      console.log('✓ Blinking completed for email field');
    } else {
      console.log('⚠️  Email input not found on page');
      
      // Fallback: highlight any input
      const inputs = await page.$$('input');
      if (inputs.length > 0) {
        console.log(`✓ Found ${inputs.length} input element(s) - highlighting first one`);
        await highlighter.highlightElement('input:first-child', 2000);
        console.log('✓ Blinking completed');
      }
    }
  });

  test('Verify highlight color is yellow + red', async ({ page }) => {
    console.log('🎨 Verifying Color Configuration');
    
    // Check the highlighter configuration
    expect(highlighter.highlightColor).toBe('#FFD700');
    expect(highlighter.highlightBorder).toContain('FF0000');
    
    console.log('✓ Color: Yellow (#FFD700)');
    console.log('✓ Border: Red (#FF0000)');
  });

  test('Multiple element blinking sequence', async ({ page }) => {
    console.log('💫 Testing Sequential Blinking');
    
    await page.waitForLoadState('domcontentloaded');
    
    // Get all input fields
    const inputs = await page.$$('input');
    console.log(`Found ${inputs.length} input field(s)`);
    
    // Highlight first input
    if (inputs.length >= 1) {
      console.log('Highlighting input 1...');
      await highlighter.highlightElement('input:nth-of-type(1)', 1000);
    }
    
    // Highlight second input
    if (inputs.length >= 2) {
      console.log('Highlighting input 2...');
      await highlighter.highlightElement('input:nth-of-type(2)', 1000);
    }
    
    console.log('✓ Sequential blinking completed');
  });

  test('Visual verification - Take screenshots', async ({ page }) => {
    console.log('📸 Taking Screenshots with Highlighting');
    
    await page.waitForLoadState('domcontentloaded');
    
    // Highlight and screenshot email
    await highlighter.highlightAndScreenshot('input[type="email"]', 'email-highlighted');
    console.log('✓ Email field screenshot saved');
    
    // Highlight and screenshot password
    await highlighter.highlightAndScreenshot('input[type="password"]', 'password-highlighted');
    console.log('✓ Password field screenshot saved');
  });

  test('Color change demonstration', async ({ page }) => {
    console.log('🎨 Testing Color Changes');
    
    await page.waitForLoadState('domcontentloaded');
    
    // Start with yellow (default)
    console.log('🟡 Highlighting with Yellow (default)...');
    await highlighter.highlightElement('input[type="email"]', 1000);
    
    // Change to green
    highlighter.setHighlightColor('#00FF00');
    console.log('🟢 Changed to Green');
    await highlighter.highlightElement('input[type="password"]', 1000);
    
    // Change to blue
    highlighter.setHighlightColor('#0000FF');
    console.log('🔵 Changed to Blue');
    if (await page.$('button[type="submit"]')) {
      await highlighter.highlightElement('button[type="submit"]', 1000);
    }
    
    console.log('✓ Color change demonstration completed');
  });
});

const { test, expect } = require('@playwright/test');
const { ExternalWebsitePage } = require('./pages/external-website.page');

// Example tests using different Playwright features with BasePage inheritance

test.describe('Basic Navigation Tests', () => {
  test('should navigate to external URL', async ({ page }, testInfo) => {
    // Allure Annotations
    testInfo.annotations.push(
      { type: 'feature', description: 'Navigation' },
      { type: 'story', description: 'External URL Navigation' },
      { type: 'severity', description: 'medium' },
      { type: 'tag', description: 'navigation' },
      { type: 'tag', description: 'external' }
    );

    const website = new ExternalWebsitePage(page);
    
    await website.navigateToExternalSite('https://example.com');
    const title = await website.getPageTitle();
    
    expect(title).toMatch(/Example Domain/);
    console.log(`✓ Successfully navigated to Example Domain - Title: ${title}`);
  });

  test('should navigate to Wikipedia', async ({ page }, testInfo) => {
    // Allure Annotations
    testInfo.annotations.push(
      { type: 'feature', description: 'Navigation' },
      { type: 'story', description: 'Wikipedia Navigation' },
      { type: 'severity', description: 'medium' },
      { type: 'tag', description: 'navigation' },
      { type: 'tag', description: 'external' }
    );

    const website = new ExternalWebsitePage(page);
    
    await website.navigateToExternalSite('https://www.wikipedia.org');
    const title = await website.getPageTitle();
    
    expect(title).toMatch(/Wikipedia/);
    console.log(`✓ Successfully navigated to Wikipedia - Title: ${title}`);
  });
});

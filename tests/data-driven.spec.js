const { test, expect } = require('@playwright/test');
const { ExternalWebsitePage } = require('./pages/external-website.page');

const urls = [
  { url: 'https://example.com', title: 'Example Domain' },
  { url: 'https://www.wikipedia.org', title: 'Wikipedia' },
];

test.describe('Data-driven URL tests', () => {
  for (const { url, title } of urls) {
    test(`validate title on ${url}`, async ({ page }, testInfo) => {
      // Allure Annotations
      testInfo.annotations.push(
        { type: 'feature', description: 'Navigation' },
        { type: 'story', description: 'Data-Driven URL Validation' },
        { type: 'severity', description: 'medium' },
        { type: 'tag', description: 'data-driven' },
        { type: 'tag', description: 'navigation' }
      );

      const website = new ExternalWebsitePage(page);
      
      await website.navigateToExternalSite(url);
      const pageTitle = await website.getPageTitle();
      
      expect(pageTitle).toMatch(new RegExp(title));
      console.log(`✓ URL: ${url} - Title: ${pageTitle}`);
    });
  }
});

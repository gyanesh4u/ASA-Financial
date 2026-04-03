// playwright.config.js
const config = {
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  use: {
    actionTimeout: 10000,
    navigationTimeout: 30000,
    baseURL: 'https://asacentraldev.asacore.com',
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
  // Only Chromium (Chrome) browser is configured
  outputDir: 'test-results/',
};

module.exports = config;

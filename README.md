# Playwright JavaScript Framework

A full-featured Playwright test automation framework with Page Object Models, fixtures, and data-driven tests.

## Installation

```bash
npm install
npx playwright install
```

## Quick Start

```bash
# Run all tests
npm test

# Run tests in headed (visual) mode
npm run test:headed

# View HTML test report
npm run test:report
```

## Project Structure

```
├── playwright.config.js      # Playwright configuration (browsers, timeouts, reporters)
├── package.json              # Dependencies and scripts
├── tests/
│   ├── example.spec.js       # Example tests using POM
│   ├── data-driven.spec.js   # Data-driven test examples
│   ├── pages/
│   │   └── home.page.js      # Page Object Model for HomePage
│   └── fixtures/
│       └── custom.fixtures.js # Custom test fixtures
└── .gitignore
```

## Key Features

- **Page Object Models** - Organize selectors and page interactions in `tests/pages/`
- **Custom Fixtures** - Create reusable test setup in `tests/fixtures/custom.fixtures.js`
- **Multi-browser** - Runs on Chromium, Firefox, and WebKit (configurable)
- **Data-driven Tests** - Loop over test data for multiple scenarios
- **Reporting** - HTML, JUnit, and list reporters included
- **Screenshots & Videos** - Automatically captured on test failures
- **Traces** - Debug information saved on first retry

## Configuration

Edit `playwright.config.js` to:
- Change `baseURL` to your app URL
- Add `webServer` command to auto-start local app
- Configure projects (browsers, devices)
- Adjust timeouts and retries
- Add environment variables

## Writing Tests

### Basic Test
```javascript
const { test, expect } = require('@playwright/test');

test('my test', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Example/);
});
```

### Using Page Object Model
```javascript
const { test, expect } = require('@playwright/test');
const { HomePage } = require('./pages/home.page');

test('using POM', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.clickGetStarted();
});
```

### Using Custom Fixtures
```javascript
const { test, expect } = require('./fixtures/custom.fixtures');

test('with fixture', async ({ user }) => {
  expect(user.name).toBe('automated-user');
});
```

## Reports

After running tests:
- **HTML Report**: `npm run test:report` (opens in browser)
- **JUnit XML**: `test-results/results.xml` (for CI/CD)
- **Screenshots**: `test-results/` (on failure)
- **Videos**: `test-results/` (on failure, if enabled)

## CI/CD Integration

The framework is CI-ready. In CI environments:
- Set `CI=true` to enable single worker, retries, and headless mode
- Use JUnit reporter for integration with CI systems
- Artifacts are in `test-results/`

## Tips

- Use `--headed` flag to visually debug tests
- Use `--debug` flag for step-by-step execution
- Use `--project=chromium` to run specific browser
- Add `.only` to focus on specific tests during development
- Check `playwright.config.js` comments for more options

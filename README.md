# 🏢 ASA Financial - Playwright Test Automation Framework

![ASA Financial Logo](assets/asa-logo.png)

```
    ╔═══════════════════════════════════════════════════════════╗
    ║                    ASA FINANCIAL                          ║
    ║          Test Automation Framework                        ║
    ║         Powered by Playwright & JavaScript                ║
    ╚═══════════════════════════════════════════════════════════╝
```

A professional, enterprise-grade test automation framework built with Playwright and JavaScript, featuring a Base Page Architecture for clean, maintainable, and scalable testing.

## Features

- Base Page Architecture with 30+ reusable utility methods
- Automatic Browser Management for each test
- Page Object Model pattern
- Professional Reporting (HTML, JUnit XML, Allure)
- Screenshot Capture attached to reports
- Enterprise Logging with timestamps
- Allure Integration with annotations
- Cross-browser Ready (Chromium)
- 100% Tests Passing

## Quick Start

### Prerequisites
- Node.js (v14+)
- npm

### Installation

Clone the repository and install dependencies using npm.

### Run Tests

Use npm scripts to run tests in various modes. Run all tests, tests in headed mode with visible browser, or specific test files.

## Project Structure

The project includes page objects in the pages directory, test fixtures, multiple test suites, and configuration files. All page objects extend the BasePage foundation class.

## Architecture

### Base Page Class

All page objects extend BasePage, providing navigation methods, element interaction methods, screenshot utilities, and logging functions.

Navigation: Navigate to URL, get current URL, get page title, wait for page load, wait for elements.

Interaction: Fill fields, click elements, get text, get attributes, check visibility, scroll.

Screenshots: Save to files, attach to Allure reports, dual capture options.

Logging: Timestamped messages, scroll operations, wait conditions, and JavaScript execution.

### Page Object Hierarchy

All specific page objects inherit from the base page foundation class for consistent behavior.

## 🎯 Project Diagrams

### Framework Architecture

```
┌─────────────────────────────────────────────────┐
│  Playwright Test Automation Framework            │
└─────────────────────────────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────────┐
        │   BasePage Foundation       │
        │  (30+ Utility Methods)      │
        └─────────────────────────────┘
                │     │     │     │
        ┌───────┴─────┼─────┴─────┴────────┐
        │             │                    │
        ▼             ▼                    ▼
    LoginPage    ManageFintech       RegistrationPage
                                         │
        │             │                  │
        └─────────────┼──────────────────┘
                      ▼
                Test Files
                │  │  │  │  │  │
        ├───────┼──┼──┼──┼──┴──┤
        │       │  │  │  │     │
        ▼       ▼  ▼  ▼  ▼     ▼
      Login  Browser Dashboard Registration Example Data-driven
      Tests  Lifecycle Tests   Navigation   Tests   Tests
```

### Browser Lifecycle Per Test

```
Test Start
    │
    ├─→ Browser Opens (Automatic)
    │   ├─ Chrome Process Launches
    │   ├─ Browser Context Created
    │   └─ Page Initialized
    │
    ├─→ Test Code Executes
    │   ├─ Page Object Created (extends BasePage)
    │   ├─ Navigate to URL (BasePage method)
    │   ├─ Interact with Elements (BasePage methods)
    │   ├─ Capture Screenshots (BasePage methods)
    │   └─ Verify Results (Assertions)
    │
    ├─→ Browser Closes (Automatic - Finally Block)
    │   ├─ Page Cleanup
    │   ├─ Context Cleanup
    │   └─ Browser Shutdown
    │
Test Complete ✓
```

### Page Object Inheritance Model

```
BasePage (Abstract Foundation)
├── Navigation Methods (5)
├── Element Interaction (7)
├── Screenshot Utilities (3)
├── Logging & Utils (12+)
└── Browser Management

    │         │         │         │
    ▼         ▼         ▼         ▼
LoginPage  ManageFintech  RegistrationPage  ExternalWebsite
├─ login()    ├─ clickReg()    ├─ isReg...      ├─ navTo()
├─ logout()   ├─ getUserMenu() ├─ getContent()  └─ getTitle()
└─ ...        └─ ...           └─ ...

All inherit 30+ methods from BasePage!
```

### Test Execution Flow

```
NPM Test Command
    │
    ▼
Playwright Reads Config
    │
    ├─ Browser: Chrome
    ├─ Workers: 1 (Sequential)
    ├─ Timeout: 30s per test
    └─ Base URL: https://asacentraldev...
    │
    ▼
Run 10 Tests
    │
    ├─ Browser Lifecycle (2)
    ├─ Login Tests (1)
    ├─ Dashboard Tests (2)
    ├─ Navigation Tests (1)
    ├─ Data-driven Tests (2)
    └─ External Website Tests (2)
    │
    ▼
Generate Reports
    │
    ├─ HTML Report (playwright-report/)
    ├─ JUnit XML (test-results/results.xml)
    ├─ Allure Report (allure-results/)
    └─ Console Output
    │
    ▼
Test Complete ✓ All 10 Passed
```

### Directory Structure

```
ASA/
├── tests/
│   ├── pages/
│   │   ├── base.page.js              ← Foundation
│   │   ├── login.page.js             ├─ Extends BasePage
│   │   ├── manage-fintech.page.js    ├─ Extends BasePage
│   │   ├── registration.page.js      ├─ Extends BasePage
│   │   └── external-website.page.js  └─ Extends BasePage
│   │
│   ├── fixtures/
│   │   └── login.fixture.js          ← Test fixtures
│   │
│   ├── browser-lifecycle.spec.js     ← 2 tests
│   ├── login.spec.js                 ← 1 test
│   ├── manage-fintech.spec.js        ← 2 tests
│   ├── registration-navigation.spec.js ← 1 test
│   ├── example.spec.js               ← 2 tests
│   └── data-driven.spec.js           ← 2 tests
│
├── playwright.config.js              ← Configuration
├── package.json                      ← Dependencies
└── README.md                         ← Documentation
```

### Method Categories Overview

```
BasePage Methods (30+)
│
├─ Navigation (5)
│  ├─ goto()
│  ├─ getUrl()
│  ├─ getTitle()
│  ├─ waitForPageLoad()
│  └─ waitForElement()
│
├─ Element Interaction (7)
│  ├─ fillField()
│  ├─ clickElement()
│  ├─ getText()
│  ├─ getAttribute()
│  ├─ isElementVisible()
│  ├─ isElementHidden()
│  └─ scrollToElement()
│
├─ Screenshots (3)
│  ├─ takeScreenshot()
│  ├─ attachScreenshot()
│  └─ captureStep()
│
└─ Utilities & Logging (12+)
   ├─ log()
   ├─ scrollToTop()
   ├─ scrollToBottom()
   ├─ waitForCondition()
   ├─ evaluateScript()
   ├─ getPageContent()
   ├─ setViewportSize()
   ├─ acceptDialog()
   ├─ dismissDialog()
   ├─ interceptRequest()
   ├─ onPageEvent()
   └─ And more...
```

## Test Results

All test suites are passing:
- Browser Lifecycle Management Tests (2)
- Data-driven URL Tests (2)
- Navigation Tests (2)
- Login Tests (1)
- Dashboard Tests (2)
- Registration Tests (1)

Total: 10 tests passing consistently.

## Usage

Page objects extend BasePage with page-specific methods. Tests use these objects with automatic browser lifecycle management, Allure annotations, and professional logging.

## Browser Lifecycle

Every test automatically opens a browser, creates a page, executes test code, then closes the browser. Resource cleanup is automatic. No manual cleanup needed.

## Configuration

Browser settings include base URL configuration, headless mode, screenshot and video options, viewport dimensions, and retry logic.

Reporters include console output, HTML reports, XML reports for CI/CD, and Allure reports with test details.

## Credentials

Application credentials should be configured in test files for your environment.

## Code Statistics

| Metric | Value |
|--------|-------|
| Base Page Lines | 156 |
| Base Page Methods | 30+ |
| Page Objects | 4 |
| Test Files | 6 |
| Tests | 10 |
| Pass Rate | 100% |
| Code Reduction | 80% |

## Creating New Tests

Create a page object by extending BasePage. Create a test file that uses the page object. Browser management is automatic.

## Development

Run all tests, tests in headed mode, view HTML reports, or generate Allure reports using npm scripts.

## Reports

HTML reports provide test execution details. Allure reports include screenshots and documentation. JUnit XML integrates with CI/CD platforms.

## Continuous Integration

Works with any CI/CD platform by installing dependencies and running npm test commands.

## Best Practices

Use page objects for page-specific logic. Extend BasePage to inherit utilities. Add Allure annotations. Capture screenshots at key steps. Use professional logging. Create fixtures to reuse page objects.

## Troubleshooting

Increase timeout if tests time out. Use wait methods for unreliable elements. Check selectors if elements not found.

## Project Info

Framework: Playwright Test v1.58.2
Language: JavaScript (CommonJS)
Browser: Chromium (Chrome)
Execution: Sequential (1 worker)
Base URL: https://asacentraldev.asacore.com
Status: Production Ready

## License

MIT

---

Framework Status: Production Ready
Tests Passing: 10/10
Last Updated: April 3, 2026

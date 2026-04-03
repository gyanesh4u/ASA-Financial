/**
 * BasePage - Base class for all page objects
 * Handles:
 * - Browser initialization
 * - URL navigation
 * - Page setup and teardown
 * - Common utility methods
 */

class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.BASE_URL || 'https://asacentraldev.asacore.com';
  }

  /**
   * Navigate to a specific URL or path
   * @param {string} path - URL path (e.g., '/login' or full URL)
   * @param {Object} options - Navigation options
   */
  async goto(path = '', options = {}) {
    const url = path.startsWith('http') ? path : `${this.baseURL}${path}`;
    console.log(`Navigating to: ${url}`);
    
    try {
      await this.page.goto(url, {
        waitUntil: 'networkidle',
        ...options
      });
      console.log('✓ Page loaded successfully');
    } catch (error) {
      console.error(`✗ Failed to navigate to ${url}:`, error.message);
      throw error;
    }
  }

  /**
   * Get current page URL
   * @returns {string} Current URL
   */
  getUrl() {
    return this.page.url();
  }

  /**
   * Get current page title
   * @returns {Promise<string>} Page title
   */
  async getTitle() {
    return this.page.title();
  }

  /**
   * Wait for page to load
   * @param {string} state - Load state: 'load', 'domcontentloaded', 'networkidle'
   */
  async waitForPageLoad(state = 'networkidle') {
    await this.page.waitForLoadState(state);
  }

  /**
   * Wait for specific element to be visible
   * @param {string} selector - CSS selector
   * @param {Object} options - Wait options
   */
  async waitForElement(selector, options = {}) {
    const locator = this.page.locator(selector);
    await locator.waitFor({
      state: 'visible',
      timeout: 10000,
      ...options
    });
    return locator;
  }

  /**
   * Take screenshot and save to file
   * @param {string} name - Screenshot name (without extension)
   */
  async takeScreenshot(name) {
    const filename = `screenshots/${name}.png`;
    await this.page.screenshot({ path: filename });
    console.log(`✓ Screenshot saved: ${filename}`);
    return filename;
  }

  /**
   * Attach screenshot to Allure report
   * @param {Object} testInfo - Test info object
   * @param {string} name - Attachment name
   */
  async attachScreenshot(testInfo, name) {
    const screenshot = await this.page.screenshot();
    await testInfo.attach(name, {
      body: screenshot,
      contentType: 'image/png'
    });
  }

  /**
   * Take dual screenshots (file + Allure)
   * @param {Object} testInfo - Test info object
   * @param {string} name - Screenshot name
   */
  async captureStep(testInfo, name) {
    await this.takeScreenshot(name);
    await this.attachScreenshot(testInfo, name);
  }

  /**
   * Fill form field
   * @param {string} selector - CSS selector
   * @param {string} value - Value to fill
   */
  async fillField(selector, value) {
    const locator = this.page.locator(selector);
    await locator.fill(value);
  }

  /**
   * Click element
   * @param {string} selector - CSS selector
   */
  async clickElement(selector) {
    const locator = this.page.locator(selector);
    await locator.click();
  }

  /**
   * Get text content of element
   * @param {string} selector - CSS selector
   * @returns {Promise<string>} Element text
   */
  async getText(selector) {
    return this.page.locator(selector).innerText();
  }

  /**
   * Get attribute value
   * @param {string} selector - CSS selector
   * @param {string} attribute - Attribute name
   * @returns {Promise<string>} Attribute value
   */
  async getAttribute(selector, attribute) {
    return this.page.locator(selector).getAttribute(attribute);
  }

  /**
   * Check if element is visible
   * @param {string} selector - CSS selector
   * @returns {Promise<boolean>} Is visible
   */
  async isElementVisible(selector) {
    try {
      await this.page.locator(selector).waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if element is hidden
   * @param {string} selector - CSS selector
   * @returns {Promise<boolean>} Is hidden
   */
  async isElementHidden(selector) {
    try {
      await this.page.locator(selector).waitFor({ state: 'hidden', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Scroll to element
   * @param {string} selector - CSS selector
   */
  async scrollToElement(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Scroll to top of page
   */
  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  /**
   * Scroll to bottom of page
   */
  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  /**
   * Wait for function/condition
   * @param {Function} predicate - Condition function
   * @param {Object} options - Wait options
   */
  async waitForCondition(predicate, options = {}) {
    await this.page.waitForFunction(predicate, {
      timeout: 10000,
      ...options
    });
  }

  /**
   * Get page content/HTML
   * @returns {Promise<string>} Page HTML
   */
  async getPageContent() {
    return this.page.content();
  }

  /**
   * Close browser/page
   */
  async closePage() {
    await this.page.close();
    console.log('✓ Page closed');
  }

  /**
   * Close browser context
   */
  async closeContext() {
    await this.page.context().close();
    console.log('✓ Browser context closed');
  }

  /**
   * Close browser
   */
  async closeBrowser() {
    const browser = await this.page.context().browser();
    await browser.close();
    console.log('✓ Browser closed');
  }

  /**
   * Execute JavaScript in page context
   * @param {string|Function} script - Script to execute
   * @param {*} arg - Optional argument
   * @returns {Promise<*>} Result
   */
  async evaluateScript(script, arg) {
    return this.page.evaluate(script, arg);
  }

  /**
   * Add page event listener
   * @param {string} event - Event name ('load', 'close', 'popup', etc.)
   * @param {Function} handler - Event handler
   */
  onPageEvent(event, handler) {
    this.page.on(event, handler);
  }

  /**
   * Remove page event listener
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   */
  offPageEvent(event, handler) {
    this.page.off(event, handler);
  }

  /**
   * Get page viewport size
   * @returns {Object} { width, height }
   */
  getViewportSize() {
    return this.page.viewportSize();
  }

  /**
   * Set page viewport size
   * @param {number} width - Width in pixels
   * @param {number} height - Height in pixels
   */
  async setViewportSize(width, height) {
    await this.page.setViewportSize({ width, height });
  }

  /**
   * Accept browser dialog (alert, confirm, etc.)
   */
  async acceptDialog() {
    this.page.once('dialog', dialog => dialog.accept());
  }

  /**
   * Dismiss browser dialog
   */
  async dismissDialog() {
    this.page.once('dialog', dialog => dialog.dismiss());
  }

  /**
   * Intercept network requests
   * @param {string} urlPattern - URL pattern to intercept
   * @param {string} responseType - Response type ('abort', 'continue', etc.)
   */
  async interceptRequest(urlPattern, responseType = 'abort') {
    await this.page.route(urlPattern, route => route[responseType]());
  }

  /**
   * Log message with timestamp
   * @param {string} message - Message to log
   * @param {string} level - Log level ('info', 'warn', 'error')
   */
  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      'info': '✓',
      'warn': '⚠',
      'error': '✗'
    }[level] || '•';
    
    console.log(`[${timestamp}] ${prefix} ${message}`);
  }
}

module.exports = { BasePage };

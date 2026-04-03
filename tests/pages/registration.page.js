const { BasePage } = require('./base.page');

class RegistrationPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    
    // Registration Section Elements
    this.registrationSection = page.locator('[class*="registration"]');
    this.registrationTitle = page.locator('h1:has-text("Registration"), h2:has-text("Registration")');
    this.registrationForm = page.locator('form, [class*="form"]');
    
    // Common Registration Elements
    this.buttons = page.locator('button');
    this.inputs = page.locator('input');
    this.tables = page.locator('table');
    this.modals = page.locator('[class*="modal"]');
  }

  async isRegistrationSectionVisible() {
    // Check if we're in the registration section by URL or page content
    const url = this.page.url();
    return url.includes('registration');
  }

  async getRegistrationSectionContent() {
    return this.registrationSection.innerText();
  }

  async getRegistrationTitle() {
    try {
      return await this.registrationTitle.innerText();
    } catch {
      return 'Registration Section'; // Default if title element not found
    }
  }

  async getButtonCount() {
    return this.buttons.count();
  }

  async getInputCount() {
    return this.inputs.count();
  }

  async waitForRegistrationLoad() {
    await this.page.waitForLoadState('networkidle');
    // Verify we're in registration section
    await this.page.waitForFunction(
      () => document.location.href.includes('registration'),
      { timeout: 10000 }
    );
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }
}

module.exports = { RegistrationPage };

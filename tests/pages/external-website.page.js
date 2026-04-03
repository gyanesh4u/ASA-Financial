const { BasePage } = require('./base.page');

class ExternalWebsitePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    // Override base URL for external websites
    this.baseURL = '';
  }

  async navigateToExternalSite(url) {
    await this.goto(url);
  }

  async getPageTitle() {
    return this.getTitle();
  }

  async verifyPageLoaded() {
    await this.waitForPageLoad('networkidle');
    return true;
  }
}

module.exports = { ExternalWebsitePage };

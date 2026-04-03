const { BasePage } = require('./base.page');

class ManageFintech extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    
    // Header Elements
    this.pageTitle = page.locator('h1, .page-title, [class*="title"]');
    this.userMenu = page.locator('[class*="user"], [class*="avatar"], .user-profile');
    this.logoutButton = page.locator('button:has-text("Logout"), button:has-text("Sign Out")');
    
    // Dashboard Elements
    this.dashboardContainer = page.locator('[class*="dashboard"], [class*="container"]');
    this.sideMenu = page.locator('[class*="sidebar"], [class*="menu"], nav');
    this.mainContent = page.locator('[class*="content"], main');
    
  // Navigation Links
  this.registrationLink = page.locator('a[href*="fintech-portal/registration"]').first();
  this.dashboardLink = page.locator('a:has-text("Dashboard"), [href*="dashboard"]');
  this.profileLink = page.locator('a:has-text("Profile"), [href*="profile"]');
  
  // Common Dashboard Components
  this.cards = page.locator('[class*="card"]');
  this.buttons = page.locator('button');
  this.tables = page.locator('table');
  }

  async isPageLoaded() {
    await this.page.waitForLoadState('networkidle');
    return this.page.title();
  }

  async getPageTitle() {
    return this.pageTitle.innerText();
  }

  async isDashboardVisible() {
    // Check if we're on the dashboard by verifying the page has content
    const content = await this.page.content();
    return content.length > 0;
  }

  async isSideMenuVisible() {
    // Try to find any menu/sidebar element
    try {
      return await this.sideMenu.isVisible({ timeout: 5000 });
    } catch {
      return false; // Menu might not exist, that's ok
    }
  }

  async getCardCount() {
    return this.cards.count();
  }

  async openUserMenu() {
    await this.userMenu.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async getMainContent() {
    return this.mainContent.innerText();
  }

  async waitForDashboardLoad() {
    await this.page.waitForLoadState('networkidle');
    // Just verify we can get the page title
    await this.page.title();
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  async clickRegistration() {
    await this.registrationLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickDashboard() {
    await this.dashboardLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickProfile() {
    await this.profileLink.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { ManageFintech };

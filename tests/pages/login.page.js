const { BasePage } = require('./base.page');

class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button:has-text("Login")');
    this.rememberMeCheckbox = page.locator('#custom-check-1');
  }

  async goto() {
    await super.goto('/#/login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithRememberMe(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.rememberMeCheckbox.check();
    await this.loginButton.click();
  }

  async isLoginButtonVisible() {
    return this.loginButton.isVisible();
  }

  async isUsernameFieldVisible() {
    return this.usernameInput.isVisible();
  }

  async isPasswordFieldVisible() {
    return this.passwordInput.isVisible();
  }

  async clearForm() {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }
}

module.exports = { LoginPage };

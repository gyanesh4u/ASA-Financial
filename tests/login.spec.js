const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/login.page');

test.describe('ASA Central Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should display login page with all elements', async () => {
    expect(await loginPage.isUsernameFieldVisible()).toBeTruthy();
    expect(await loginPage.isPasswordFieldVisible()).toBeTruthy();
    expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
  });

  test('should allow user to enter username and password', async () => {
    await loginPage.usernameInput.fill('testuser');
    await loginPage.passwordInput.fill('password123');

    await expect(loginPage.usernameInput).toHaveValue('testuser');
    await expect(loginPage.passwordInput).toHaveValue('password123');
  });

  test('should have functional login button', async ({ page }) => {
    await loginPage.usernameInput.fill('testuser');
    await loginPage.passwordInput.fill('password123');

    const loginButtonText = await loginPage.loginButton.innerText();
    expect(loginButtonText).toContain('Login');
  });

  test('should clear form fields', async () => {
    await loginPage.usernameInput.fill('testuser');
    await loginPage.passwordInput.fill('password123');
    
    await loginPage.clearForm();

    await expect(loginPage.usernameInput).toHaveValue('');
    await expect(loginPage.passwordInput).toHaveValue('');
  });

  test('should have remember me checkbox', async ({ page }) => {
    const rememberCheckbox = page.locator('#custom-check-1');
    expect(await rememberCheckbox.isVisible()).toBeTruthy();
  });
});

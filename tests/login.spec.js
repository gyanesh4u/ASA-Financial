const { test } = require('./fixtures/login.fixture');
const { expect } = require('@playwright/test');

test.describe('ASA Central Login Tests', () => {
  
  test('should display login page with all elements', async ({ loginPage }) => {
    expect(await loginPage.isUsernameFieldVisible()).toBeTruthy();
    expect(await loginPage.isPasswordFieldVisible()).toBeTruthy();
    expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
  });

  test('should allow user to enter username and password', async ({ loginPage }) => {
    await loginPage.usernameInput.fill('testuser');
    await loginPage.passwordInput.fill('password123');

    await expect(loginPage.usernameInput).toHaveValue('testuser');
    await expect(loginPage.passwordInput).toHaveValue('password123');
  });

  test('should have functional login button', async ({ loginPage }) => {
    await loginPage.usernameInput.fill('testuser');
    await loginPage.passwordInput.fill('password123');

    const loginButtonText = await loginPage.loginButton.innerText();
    expect(loginButtonText).toContain('Login');
  });

  test('should clear form fields', async ({ loginPage }) => {
    await loginPage.usernameInput.fill('testuser');
    await loginPage.passwordInput.fill('password123');
    
    await loginPage.clearForm();

    await expect(loginPage.usernameInput).toHaveValue('');
    await expect(loginPage.passwordInput).toHaveValue('');
  });

  test('should have remember me checkbox', async ({ loginPage }) => {
    expect(await loginPage.rememberMeCheckbox.isVisible()).toBeTruthy();
  });
});

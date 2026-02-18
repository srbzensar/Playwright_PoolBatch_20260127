import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../pages/LoginPage.js';

dotenv.config();

test('Yahoo Login using POM with login() method', async ({ page }) => {
    const url = "https://login.yahoo.com/";
    const userId = process.env.YAHOO_USER;
    const password = process.env.YAHOO_PASSWORD;

    const loginPage = new LoginPage(page);

    await loginPage.navigate(url);
    await expect(page).toHaveTitle(/Yahoo/i);

    // Single method for login
    await loginPage.login(userId, password);

    const currentUrl = await loginPage.getCurrentUrl();
    console.log("URL after login:", currentUrl);

    await expect(currentUrl).toMatch(/login\.yahoo\.com|yahoo\.com/);

    await page.close();
});
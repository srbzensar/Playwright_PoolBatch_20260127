import { test, expect } from '@playwright/test';

test('Yahoo Login Example', async ({ page }) => {

    const url = "https://login.yahoo.com/";
    const userId = "test.selenium@myyahoo.com";
    const password = "PlayDemo@123";
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(1000);

    await expect(page).toHaveTitle(/Yahoo/i);

    // await page.waitForTimeout(3000);
    // ------------------------------------

    // Enter username/email
    await page.locator('#login-username').fill(userId);
    await page.waitForTimeout(1000);

    // Click Next
    await page.locator('#login-signin').click();
    // await page.waitForTimeout(3000);

    // Enter password (assuming next page loads)
    await page.locator('#login-passwd').fill(password);
    await page.waitForTimeout(2000);

    // Click Sign In
    await page.locator('#login-signin').click();

    // await page.waitForTimeout(3000);
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Validate successful login (check for profile icon or redirect)
    console.log("URL after login: ", page.url());
    await expect(page.url()).toMatch(/yahoo\.com/);

    // -------------------------------------
    await page.waitForTimeout(3000);
    await page.close();
});


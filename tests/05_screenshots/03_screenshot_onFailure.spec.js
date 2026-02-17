const { test, expect } = require('@playwright/test');


test('Take Screenshot: on failure', async ({ page }) => {

  await page.goto('https://www.wikipedia.org');
  
  // enabled screenshot in playwright.config.js as 'only-on-failure' to capture screenshot only when test fails.
  await expect(page).toHaveTitle(/WIKI/);
});

import { test, expect } from '@playwright/test';

test('run tests', async ({ page }) => {

  // Navigate to wikipedia
  await page.goto('https://www.wikipedia.org/');
  await page.waitForTimeout(3000);  // wait to see the action (debug/ demo purpose)
  
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Wikipedia/);

    // close browser window - closes the page
    await page.close();

    

});
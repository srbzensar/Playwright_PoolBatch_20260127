const { test, expect } = require('@playwright/test');


test('Take video_On Failure', async ({ page }) => {

  await page.goto('https://www.wikipedia.org');
  
//   You can also automatically capture video on failure by enabling it in playwright.config.js
// use: {   video: 'retain-on-failure', // or 'on', 'off'  }
// the videos are saved in the test results output directory

  // assert title with wrong text to fail the test and capture video
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveTitle(/WIKI/);
});



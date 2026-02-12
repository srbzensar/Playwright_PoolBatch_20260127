const { test, expect } = require('@playwright/test');


test('Take Screenshot_Same Name', async ({ page }) => {

  await page.goto('https://www.wikipedia.org');
  await expect(page).toHaveTitle(/Wikipedia/);

//   same screenshot name for each test run in screenshots folder
  const screenshotName = 'screenshots/Wikipedia.png';
  await page.screenshot({ path: screenshotName });
});


test.skip('Take Screenshot_Unique Name', async ({ page }) => {

  await page.goto('https://www.wikipedia.org');
  await expect(page).toHaveTitle(/Wikipedia/);

  //   unique screenshot name for each test run in screenshots folder
  const screenshotName = `screenshots/Wikipedia-${Date.now()}.png`;
  
  await page.screenshot({ path: screenshotName }); 
});


test('Take Screenshot_TestTitle', async ({ page }, testInfo) => {

  await page.goto('https://www.wikipedia.org');
  await expect(page).toHaveTitle(/Wikipedia/);
  
  //   mention screenshot name as <testname>_ in screenshots folder for demo. 
    const screenshotName = `screenshots/${testInfo.title}-${Date.now()}.png`;
  console.log('Screenshot name:', screenshotName);
  await page.screenshot({ path: screenshotName });
});


test('Take Screenshot_BestPractice', async ({ page }, testInfo) => {

  await page.goto('https://www.wikipedia.org');
  await expect(page).toHaveTitle(/Wikipedia/);
  
    // We had used screenshots folder for demo purpose
    // Best practice is to save screenshots in test-results folder using testInfo.outputPath()
    await page.screenshot({ path: testInfo.outputPath('Wikipedia_success.png') });

// Notes
//  Why Use It?
// Ensures screenshots, videos, and traces go into the correct folder for the test.
// Avoids hardcoding paths like screenshots/ which can break in CI/CD.
});
const { test, expect } = require('@playwright/test');


test('Take Screenshot_Element', async ({ page }, testInfo) => {

  await page.goto('https://www.wikipedia.org');
  await expect(page).toHaveTitle(/Wikipedia/);
  
  // const searchBox = page.getByRole('searchbox')
  const searchBox = page.getByRole('searchbox', { name: 'search'})
  
  await searchBox.screenshot({ path: testInfo.outputPath('element.png') });

});
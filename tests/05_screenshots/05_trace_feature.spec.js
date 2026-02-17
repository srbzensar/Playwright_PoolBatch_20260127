const { test, expect } = require('@playwright/test');
const { fail } = require('assert');


test('Trace Feature', async ({ page }, testInfo) => {

  const playerName = "Harmanpreet Kaur";
  await page.goto('https://www.wikipedia.org');
  await expect(page).toHaveTitle(/Wikipedia/);
  const searchBox = page.getByRole('searchbox', { name: 'search'});
  searchBox.fill(playerName);
  await page.getByRole('button', { name: 'Search'}).click();

  // validate that the heading contains the search text
  await expect(page.locator("#firstHeading")).toContainText(playerName);
  fail("Throwing error to trigger trace feature");

});

// use: {
//   trace: 'retain-on-failure' // or 'on', 'on-first-retry'
// }


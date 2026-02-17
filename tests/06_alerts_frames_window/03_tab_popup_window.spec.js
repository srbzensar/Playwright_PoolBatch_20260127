import { test, expect } from '@playwright/test';


test.skip('Handle new tab', async ({ context, page }) => {

    const url = "https://demoqa.com";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    await expect(page).toHaveTitle(/demosite/i);
    // ---------------------------------------
    
    // Click on "Alerts, Frame & Windows" card
    await page.click('div.card-body h5:has-text("Alerts, Frame & Windows")');
    await expect(page).toHaveURL(/.*alertsWindows/);

    // ---------------------------------------
    // Click on "Browser Windows" in the left menu
    await page.click('li#item-0 span:has-text("Browser Windows")');
    await expect(page).toHaveURL(/.*browser-windows/);

    // Click on "New Tab" button and wait for the new tab to open
    const [newTab] = await Promise.all([
        context.waitForEvent('page'), // Wait for the new page (tab) to open
        page.click('button#tabButton') // Click the button that opens the new tab
    ]);

    // Wait for the new tab to load content    
    await newTab.waitForLoadState();
    console.log("New Tab Title:", await newTab.title());
    await expect(newTab).toHaveURL(/.*sample/);

    await newTab.waitForTimeout(3000);    
    await newTab.close(); // Close the new tab

    // switch back to the parent page (no separate action is needed unlike selenium)
    // page.bringToFront(); // Optional: bring the parent page to the front
    const parentTitle = await page.title();
    console.log('Parent Page Title:', parentTitle);
    
  // ---------------------------------------
    await page.waitForTimeout(3000);    
    await page.close();
});



test('Handle new window', async ({ browser }) => {

    const url = "https://www.wikipedia.org/";
    const context1 = await browser.newContext();
    const page = await context1.newPage();
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    await expect(page).toHaveTitle(/wikipedia/i);
    console.log('Main page URL: ', page.url());

    // ---------------------------------------------------

    const url2 = "https://the-internet.herokuapp.com/";
    const context2 = await browser.newContext();
    const newPage = await context2.newPage();
    newPage.waitForLoadState();

    await newPage.goto(url2);
    await newPage.setViewportSize({ width: 1024, height: 768 });
    // await newPage.waitForTimeout(3000);

    await expect(newPage).toHaveTitle(/Internet/i);

    console.log('New page URL: ', newPage.url());

    await newPage.waitForTimeout(3000);
    
    // close the new window
    await context2.close();
    
    // switch back to the main page
    await page.bringToFront();  // ensre the main page is active again.
    console.log('Main page URL: ', page.url());
    await page.waitForTimeout(3000);

    await page.close();
});


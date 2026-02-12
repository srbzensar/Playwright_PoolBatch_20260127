import { test, expect } from '@playwright/test';

test('Shadow DOM Interaction Example', async ({ page }) => {

    // Set URL and navigate
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#17-shadow";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    // Validate page title
    await expect(page).toHaveTitle(/Playwright/i);

    await page.waitForTimeout(2000);
    // ------------------------------------

    // Locate shadow host and interact with shadow button
    const shadowHost = page.locator('#shadowHost');
    const shadowMsg = page.locator('#shadowMsg');
    
    // // following is deprecated. not supported any more
    //     const shadowButton = shadowHost.locator('pierce/#shadowBtn'); // Using Playwright's pierce selector
    
    // // // Playwright automatically pierces shadow roots when chaining locators.
    // const shadowButton = page.locator('#shadowHost').locator('#shadowBtn');
    // // OR
    // // const shadowButton = page.locator('#shadowHost').getByRole('button', { name: 'Shadow Button' });

    // const shadowButton = page.locator('button#shadowBtn'); // Directly locate button inside shadow host

    // Click the Shadow DOM button
    await shadowButton.click();
    console.log('Clicked Shadow DOM button');

    await page.waitForTimeout(2000);

    // Validate message after click
    const messageText = await shadowMsg.textContent();
    console.log('Message displayed:', messageText.trim());
    expect(messageText.trim()).toContain('Shadow DOM button clicked');

    // -------------------------------------
    await page.waitForTimeout(3000);

    await page.close();
});

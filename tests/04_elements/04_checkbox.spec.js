import { test, expect } from '@playwright/test';

test('Checkbox Check/Uncheck with Message Validation', async ({ page }) => {

    // Set URL and navigate
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#6-checkbox";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    // Validate page title
    await expect(page).toHaveTitle(/Playwright/i);

    await page.waitForTimeout(2000);
    // ------------------------------------

    // Locate checkboxes and message div
    const subscribeChk = page.locator('#subscribeChk');
    const agreeChk = page.locator('#agreeChk');
    const messageDiv = page.locator('#checkboxMsg');

    // Check initial states
    expect(await subscribeChk.isChecked()).toBeFalsy();
    expect(await agreeChk.isChecked()).toBeFalsy();

    // Check both checkboxes
    await subscribeChk.check();
    console.log('Checked Subscribe checkbox');
    await agreeChk.check();
    console.log('Checked Agree checkbox');

    // Assert both are checked
    expect(await subscribeChk.isChecked()).toBeTruthy();
    expect(await agreeChk.isChecked()).toBeTruthy();

    await page.waitForTimeout(2000);

    // Validate message after both are checked
    const messageText = await messageDiv.textContent();
    console.log('Message displayed:', messageText.trim());
    expect(messageText.trim()).toContain('Checked: Subscribe, Agree');

    await page.waitForTimeout(2000);

    // Uncheck Subscribe and validate message updates
    await subscribeChk.uncheck();
    console.log('Unchecked Subscribe checkbox');
    expect(await subscribeChk.isChecked()).toBeFalsy();

    const updatedMessage = await messageDiv.textContent();
    console.log('Updated message:', updatedMessage.trim());
    expect(updatedMessage.trim()).not.toContain('Subscribe');

    // -------------------------------------
    await page.waitForTimeout(3000);

    await page.close();
});


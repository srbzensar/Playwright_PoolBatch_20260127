import { test, expect } from '@playwright/test';

test('Radio Button Selection with Message Validation', async ({ page }) => {

    // Set URL and navigate
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#5-radio";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    // Validate page title
    await expect(page).toHaveTitle(/Playwright/i);

    await page.waitForTimeout(2000);
    // ------------------------------------

    // Locate radio buttons and message div
    const maleRadio = page.locator('#maleRadio');
    const femaleRadio = page.locator('#femaleRadio');
    const messageDiv = page.locator('#radioMsg');

    // Check initial states
    expect(await maleRadio.isChecked()).toBeFalsy();
    expect(await femaleRadio.isChecked()).toBeFalsy();

    // Select Male radio button
    await maleRadio.check();
    console.log('Selected Male radio button');

    // Assert Male is selected
    expect(await maleRadio.isChecked()).toBeTruthy();
    expect(await femaleRadio.isChecked()).toBeFalsy();

    await page.waitForTimeout(2000);

    // Validate message after selecting Male
    const maleMessage = await messageDiv.textContent();
    console.log('Message displayed:', maleMessage.trim());
    expect(maleMessage.trim()).toContain('Selected Gender: Male');

    await page.waitForTimeout(2000);

    // Select Female radio button
    await femaleRadio.check();
    console.log('Selected Female radio button');

    // Assert Female is selected
    expect(await femaleRadio.isChecked()).toBeTruthy();
    expect(await maleRadio.isChecked()).toBeFalsy();

    // Validate message after selecting Female
    const femaleMessage = await messageDiv.textContent();
    console.log('Updated message:', femaleMessage.trim());
    expect(femaleMessage.trim()).toContain('Selected Gender: Female');

    // -------------------------------------
    await page.waitForTimeout(3000);

    await page.close();
});

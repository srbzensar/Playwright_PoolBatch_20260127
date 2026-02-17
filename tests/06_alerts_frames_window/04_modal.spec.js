import { test, expect } from '@playwright/test';

test('Modal Open, Validate, and Close Example', async ({ page }) => {

    // Set URL and navigate
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#16-modal";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    // Validate page title
    await expect(page).toHaveTitle(/Playwright/i);

    await page.waitForTimeout(2000);
    // ------------------------------------

    // Locate modal open button and modal elements
    const openModalBtn = page.locator('#openModalBtn');
    const modal = page.locator('#sampleModal'); 
    const modalHeader = modal.locator('#modalTitle');
    const modalCloseBtn = modal.locator('.closeModal');

    // Click button to open modal
    await openModalBtn.click();
    console.log('Clicked Open Modal button');

    // Wait for modal to be visible
    await expect(modal).toBeVisible();
    console.log('Modal is visible');

    
 // Validate modal header text
    const headerText = await modalHeader.textContent();
    console.log('Modal header:', headerText.trim());
    expect(headerText.trim()).toContain('Modal content');

    await page.waitForTimeout(2000);

    // Close modal
    await modalCloseBtn.click();
    console.log('Clicked Close button');

    // Validate modal is hidden
    await expect(modal).toBeHidden();
    console.log('Modal is closed');

    // -------------------------------------
    await page.waitForTimeout(3000);

    await page.close();
});
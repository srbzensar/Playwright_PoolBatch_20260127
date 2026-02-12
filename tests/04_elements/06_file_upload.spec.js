import { test, expect } from '@playwright/test';
import path from 'path';

test('File Upload Example with Dynamic Filename', async ({ page }) => {

    // Set URL and navigate
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#9-file-upload";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    // Validate page title
    await expect(page).toHaveTitle(/Playwright/i);

    await page.waitForTimeout(2000);
    // ------------------------------------

    // Define filename variable for flexibility
    const fileName = 'SampleText.txt';
    const filePath = path.resolve('files', fileName);

    // Locate file input and message div
    const fileInput = page.locator('#fileUploadField');
    const messageDiv = page.locator('#fileUploadMsg');

    // Upload file using setInputFiles()
    await fileInput.setInputFiles(filePath);
    console.log(`Uploaded file: ${fileName}`);

    await page.waitForTimeout(2000);

    // Validate message after upload
    const messageText = await messageDiv.textContent();
    console.log('Message displayed:', messageText.trim());
    expect(messageText.trim()).toContain(`File Selected: ${fileName}`);

    // -------------------------------------
    await page.waitForTimeout(3000);

    await page.close();
});


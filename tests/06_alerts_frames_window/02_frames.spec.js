import { test, expect } from '@playwright/test';
import { listFrameNames } from '../../utils/frameUtils';

test.skip('Frames example', async ({ page }) => {

    const url = "https://demoqa.com/frames";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    await expect(page).toHaveTitle(/demoqa/i);
    // ---------------------------------------
    
    //   // Access frame by name or selector
    // //    page.frame({ name: 'frameName' })  for frame in page	// page.frame() → Works with name
    
    
// // Use the utility function (for understanding: freame names)
//     const names = await listFrameNames(page, 'demoqa.com'); // Only frames from demoqa.com
//     console.log('Frames found:', names);

// // Access frame by name or url (one method: page.frame)  or selector (two methods: locator vs frameLocator)

    // // way 1: Access frame by name (working)
        const frame = page.frame({ name: 'frame1' }); // frame name from HTML (note: name property added at runtime)
        // const frame = page.frame('frame1'); // frame name from HTML (note: name property added at runtime)
        // const frame = page.frame('#frame1'); // frame name from HTML (can't use CSS selector here)
        if (frame) {
            const headingText = await frame.locator('#sampleHeading').textContent();
            console.log('Text inside frame:', headingText);
        }
        // Note:
      //   // Cannot use CSS selectors like #frame1.
      //  // Not chainable for nested frames.

    //   // Access frame by URL (working)
    // const frame = page.frame({ url: "https://demoqa.com/sample" }); 
    // if (frame) {
    //     const headingText = await frame.locator('#sampleHeading').textContent();
    //     console.log('Text inside frame:', headingText);
    // }

    // // way 2: access frame by locator (working)
    // const frame1 = page.locator("#frame1").contentFrame();    // can I use page.frameLocator("#frame1")
    // const headingText = await frame1.locator('#sampleHeading').textContent();
    // console.log("frame contents: ", headingText);

    // way 3: access frame by frameLocator (working)
    // const frame1 = page.frameLocator("#frame1");  
    // const headingText = await frame1.locator('#sampleHeading').textContent();
    // console.log("frame contents: ", headingText);
    // // Returns a FrameLocator object, which is chainable.
    // // Works with CSS selectors (id, class, etc.).



    // Switch back to parent page (no separate action is needed unlike selenium)
    const parentTitle = await page.title();
    console.log('Parent Page Title:', parentTitle);

// ---------------------------------------
    await page.waitForTimeout(3000);    
    await page.close();
});


test('Nested Frames example', async ({ page }) => {

    const url = "https://demoqa.com/nestedframes";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    await expect(page).toHaveTitle(/demoqa/i);
    // ---------------------------------------
     
    // Access parent frame
    const parentFrame = page.frameLocator('#frame1');
    const parentText = await parentFrame.locator('body').textContent();
    console.log('Parent Frame Text:', parentText);

    // Access child frame inside parent
    const childFrame = parentFrame.frameLocator('iframe');
    const childText = await childFrame.locator('body').textContent();
    console.log('Child Frame Text:', childText);

   // ---------------------------------------
    await page.waitForTimeout(3000);    
    await page.close();
});




// Explanation - additional information

// ✅ page.frame()

// Returns a Frame object immediately.
// Works only if you know:
  // The frame name (name attribute in <iframe>).
  // Or match by URL.

// This is useful when you need to:
  // Access frame properties (frame.url(), frame.name()).
  // Perform multiple actions inside the same frame object.


// Limitation:
  // Cannot use CSS selectors like #frame1.
  // Not chainable for nested frames.

// -----------------------

// ✅ frameLocator()

// Returns a FrameLocator object, which is chainable.
// Works with CSS selectors (id, class, etc.).
// Ideal for nested frames.

// Advantage:
  // No need for name attribute.
  // Handles dynamic frames better.

// Limitation:
  // You cannot get frame metadata (like URL or name) from frameLocator().
  // It’s designed for locating elements inside frames, not for frame-level operations.

// -----------------------------------------------

// ✅ Quick Rule
// If your goal is just to interact with elements inside the frame → frameLocator() is enough.
// If you need frame details or dynamic logic → use page.frame() or contentFrame().


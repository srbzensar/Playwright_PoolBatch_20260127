// tests/03_subset.by.path.and.title.spec.ts
import { test } from '@playwright/test';

test.describe('Search Suite', () => {
  test('TC01 - Basic keyword search @smoke', async () => { console.log("TC01") });
  test('TC02 - Advanced search with filters @regression', async () => { console.log("TC02") });
});

/* 

# all tests
npx playwright test

# By folder
npx playwright test tests/08_Grouping

# By file
npx playwright test tests/08_Grouping/03_run_by_title.spec.js

# By title (exact)
npx playwright test -g "TC01 - Basic keyword search"

# By title (regex)
npx playwright test -g "TC02"  08_Grouping/03
npx playwright test -g "^TC02"  08_Grouping/03
*/
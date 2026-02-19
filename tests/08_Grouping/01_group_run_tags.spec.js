// tests/tagged.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Cart tests @e2e', () => {

  test('adds an item to cart',  { tag: '@smoke' }, async ({ page}) => {
    console.log("smoke test1")
  });

  test('test modify quantity of an item in cart',  { tag: ['@smoke', '@win'] },  () => {
    console.log("smoke test2")
  });

  test('@win adds an item to cart', () => {
    console.log("windows test")
  });

 test('@linux adds an item to cart', () => {
    console.log("linux test")
  });

 test('linux test',  { tag: ['@smoke', '@linux'] }, () => {
    console.log("linux, smoke")
  });

 test.skip('@smoke adds an item to cart', () => {
    console.log("windows test2")
  });


  test('@regression removes an item from cart', () => {
    console.log("Regression test")
  });
});

// # run only smoke tests
// npx playwright test --grep '@smoke'
// or
// npx playwright test -g '@smoke'

// # run everything except linux
// npx playwright test --grep-invert @linux


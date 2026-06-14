# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flipkart.spec.js >> Flipkart placeorder automation
- Location: tests/flipkart.spec.js:3:1

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('xpath=(//*[@class=\'_1psv1zeb9 _1psv1ze0 _7dzyg20 _1psv1ze9l _1psv1ze7o _1psv1ze2u _1psv1ze53\']/div[@class=\'css-g5y9jx\'])[1]')

```

# Test source

```ts
  1  | const {test, expect, request} = require('@playwright/test');
  2  | 
  3  | test('Flipkart placeorder automation', async ({browser})=>
  4  | {
  5  |     const browsercontext = await browser.newContext();
  6  |     const page = await browsercontext.newPage();
  7  |     await page.setViewportSize({ width: 1512, height: 861 });
  8  |     await page.goto("https://www.flipkart.com/search?q=apple+iphone+16+ultramarine+128+gb&sid=tyy%2C4io&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_2_15_na_na_ps&otracker1=AS_QueryStore_OrganicAutoSuggest_2_15_na_na_ps&as-pos=2&as-type=RECENT&suggestionId=apple+iphone+16+ultramarine+128+gb%7CMobiles&requestId=787a8f21-f774-4517-b0fe-5fa04625b79e&as-searchtext=apple%20iphone%20ul");
  9  |     
  10 |     
  11 |     const [newpage] = await Promise.all([
  12 |         browsercontext.waitForEvent('page'),
  13 |         page.locator("//*[contains(@data-id, 'MOBH4DQFYZT6EH2F')]").click()
  14 |     ])
  15 |     //await newpage.waitForLoadState();
> 16 |     await newpage.locator("(//*[@class='_1psv1zeb9 _1psv1ze0 _7dzyg20 _1psv1ze9l _1psv1ze7o _1psv1ze2u _1psv1ze53']/div[@class='css-g5y9jx'])[1]").click();
     |                                                                                                                                                    ^ Error: locator.click: Target page, context or browser has been closed
  17 |     await newpage.locator("//a[@title='Cart']").click();
  18 |     await newpage.getByText("Place Order ").click();
  19 |     await newpage.pause();
  20 | })
```
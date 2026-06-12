# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppE2E.spec.js >> @Smoke Client app login
- Location: tests/ClientAppE2E.spec.js:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e11] [cursor=pointer]:
      - /url: https://techsmarthire.com/
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1  | const {test, expect} = require('@playwright/test');
  2  | 
  3  | test('@Smoke Client app login', async ({page})=>
  4  | {
  5  |     const productName = 'ZARA COAT 3';
  6  |     const product = page.locator(".card-body");
  7  |     const username = page.locator("#userEmail");
  8  |     const password = page.locator("#userPassword");
  9  |     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  10 |     await username.fill("shivanikatkar@gmail.com");
  11 |     await password.fill("Shivani@7213");
  12 |     await page.locator("#login").click();
  13 |     await page.waitForLoadState ("networkidle");
  14 |     await page.locator(".card-body b").first().waitFor();
  15 |     const titles = await page.locator(".card-body b").allTextContents();
  16 |     console.log(titles);
  17 |     //we need to fetch  ZARA COAT 3
  18 |     const count = await product.count();
  19 |     for(let i=0; i< count; i++)
  20 |     {
  21 |        if(await product.nth(i).locator("b").textContent() === productName)
  22 |        {
  23 |          await product.nth(i).locator(":text('Add To Cart')").click();
  24 |          break;
  25 |        }
  26 |     }
  27 |     await page.locator("[routerlink*='cart']").click();
> 28 |     await page.locator("div li").first().waitFor();
     |                                          ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  29 |     const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  30 |     expect(bool).toBeTruthy();
  31 |     await page.locator("button:has-text('Checkout')").click();
  32 |     await page.locator("select.input.ddl").first().selectOption('04');
  33 |     await page.locator("select.input.ddl").nth(1).selectOption('26');
  34 |     await page.locator(".field.small").nth(1).locator(".input.txt").fill("752");
  35 |     await page.locator("input[type='text']").nth(2).fill("HDFC");
  36 |     await page.locator("[placeholder*='Country']").pressSequentially('ind');
  37 |     const dropdown = await page.locator(".ta-results");
  38 |     await dropdown.waitFor();
  39 |     const optionsCount = await dropdown.locator("button").count();
  40 |     for(let i=0; i< optionsCount;i++)
  41 |     {
  42 |         const text = await dropdown.locator("button").nth(i).textContent();
  43 |         if(text.trim() === "India")
  44 |         {
  45 |           await dropdown.locator("button").nth(i).click();
  46 |           break;
  47 |         }
  48 |     }
  49 |     //await page.pause();
  50 |     await page.locator(".action__submit").click();
  51 |     await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  52 |     const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  53 |     console.log(orderID);
  54 |     await page.locator("[routerlink*='myorders']").first().click();
  55 |     await page.locator("tbody").waitFor();
  56 |     const row = await page.locator("tbody tr");
  57 |     for(let i=0;i<await row.count();i++)
  58 |     {
  59 |       const rowOrderID = await row.nth(i).locator("th").textContent();
  60 |       if(orderID.includes(rowOrderID))
  61 |       {
  62 |         await row.nth(i).locator("button").first().click();
  63 |         break;
  64 |       }
  65 |     }
  66 |     const viewpageOrderID = await page.locator(".col-text").textContent();
  67 |     expect(orderID.includes(viewpageOrderID)).toBeTruthy();
  68 |     
  69 | 
  70 | });
```